#!/usr/bin/env node
/**
 * sync-films.mjs — one-shot MUBI → Firebase film sync.
 *
 * Pipeline:
 *   1. Fetch recent MUBI ratings for the profile (100 most recent; MUBI's cursor
 *      pagination does not advance via the public API, but 100 covers any normal gap).
 *   2. Fetch the current `listOfSeenfilms` from Firebase RTDB (public read) — kept as a backup.
 *   3. Merge: add MUBI films not already in the DB (dedup by title + year).
 *   4. Recompute `filmStats` (totalFilms, totalWatchTime, averageFilmYear,
 *      averageRating, directorStats, countries, longestFilm) from the merged list.
 *   5. Write output files and print a summary of the newly-added films.
 *
 * By default this is a DRY RUN (no writes to Firebase). Pass --push to also write
 * `listOfSeenfilms` and `filmStats` to production via the firebase CLI.
 *
 * Usage:
 *   node scripts/sync-films.mjs          # fetch + merge + stats + summary (no push)
 *   node scripts/sync-films.mjs --push   # ...and push both nodes to Firebase
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';

const CONFIG = {
  mubiUserId: '7811688',
  mubiHeaders: { Client: 'web', 'Client-Country': 'US', Accept: 'application/json' },
  rtdbBase: 'https://portfolio-app-2b6e1-default-rtdb.europe-west1.firebasedatabase.app',
  firebaseProject: 'portfolio-app-2b6e1',
  outDir: path.join(os.homedir(), 'Downloads'),
};

const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const PUSH = process.argv.includes('--push');
const num = (v) => (typeof v === 'number' ? v : parseInt(v) || 0);

async function fetchMubiRatings() {
  let cursor = null, all = [], prevFirst = null, total = Infinity;
  const seen = new Set();
  while (all.length < total) {
    const url = new URL(`https://api.mubi.com/v3/users/${CONFIG.mubiUserId}/ratings`);
    url.searchParams.set('per_page', '100');
    if (cursor != null) url.searchParams.set('cursor', cursor);
    const res = await fetch(url, { headers: CONFIG.mubiHeaders, cache: 'no-store' });
    if (!res.ok) throw new Error(`MUBI HTTP ${res.status}`);
    const data = await res.json();
    total = data.meta?.total_count ?? total;
    const firstId = data.ratings[0]?.id;
    if (firstId === prevFirst) break; // cursor didn't advance
    prevFirst = firstId;
    let added = 0;
    for (const r of data.ratings) if (!seen.has(r.id)) { seen.add(r.id); all.push(r); added++; }
    const next = data.meta?.next_cursor;
    if (!next || added === 0 || data.ratings.length === 0) break;
    cursor = next;
  }
  return { all, total };
}

async function fetchDbFilms() {
  const res = await fetch(`${CONFIG.rtdbBase}/listOfSeenfilms.json`);
  if (!res.ok) throw new Error(`RTDB HTTP ${res.status}`);
  const raw = await res.json();
  const arr = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? Object.values(raw) : (raw || []);
  return arr.filter(Boolean);
}

function convert(rating) {
  const film = rating.film;
  const directors = film.directors ? film.directors.map((d) => d.name || d) : [];
  return {
    still_url: film.stills?.retina || film.still_url || '',
    overall: rating.overall || 0,
    duration: film.duration || 0,
    title: film.title || '',
    directors,
    historic_countries: film.historic_countries || [],
    year: film.year || 0,
    short_synopsis: film.short_synopsis || '',
    created_at: rating.created_at || rating.updated_at || '',
  };
}

function computeStats(films) {
  const n = films.length;
  const totalMin = films.reduce((s, f) => s + num(f.duration), 0);
  const dir = {}, cty = {};
  for (const f of films) {
    for (const d of f.directors || []) if (d) dir[d] = (dir[d] || 0) + 1;
    for (const c of f.historic_countries || []) if (c) cty[c] = (cty[c] || 0) + 1;
  }
  const sorted = (o) => Object.entries(o).map(([name, count]) => ({ count, name })).sort((a, b) => b.count - a.count);
  return {
    averageFilmYear: String(Math.round(films.reduce((s, f) => s + num(f.year), 0) / n)),
    averageRating: (films.reduce((s, f) => s + num(f.overall), 0) / n).toFixed(2),
    countries: sorted(cty),
    directorStats: sorted(dir),
    longestFilm: [...films].sort((a, b) => num(b.duration) - num(a.duration)).slice(0, 20),
    totalFilms: n,
    totalWatchTime: `${Math.floor(totalMin / 60)}h ${totalMin % 60}m`,
  };
}

function pushNode(nodePath, filePath) {
  console.log(`\n⬆️  Pushing ${nodePath} ...`);
  execFileSync('firebase', ['database:set', nodePath, filePath, '--project', CONFIG.firebaseProject, '--force'], { stdio: 'inherit' });
}

async function main() {
  console.log('🎬 MUBI → Firebase film sync\n');

  const { all: ratings, total } = await fetchMubiRatings();
  console.log(`MUBI: ${ratings.length} recent ratings fetched (profile total: ${total})`);

  const existing = await fetchDbFilms();
  console.log(`Firebase: ${existing.length} films currently in listOfSeenfilms`);

  // Backup of the current DB state (for rollback)
  const backupPath = path.join(CONFIG.outDir, `listOfSeenfilms-backup-${stamp}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2));

  // Merge (dedup by title + year)
  const has = (f) => existing.some((e) => e.title === f.title && e.year === f.year);
  const merged = [...existing];
  const added = [];
  for (const r of ratings) {
    if (!r.film?.title) continue;
    if (has(r.film)) continue;
    const c = convert(r);
    merged.push(c);
    added.push(c);
  }

  if (added.length === 0) {
    console.log('\n✅ Already up to date — no new films to add.');
    return;
  }

  const stats = computeStats(merged);
  const filmsPath = path.join(CONFIG.outDir, `listOfSeenfilms-${stamp}.json`);
  const statsPath = path.join(CONFIG.outDir, `filmStats-${stamp}.json`);
  fs.writeFileSync(filmsPath, JSON.stringify(merged));
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));

  console.log(`\n=== ${added.length} NEW films ===`);
  added
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .forEach((f, i) => console.log(`${String(i + 1).padStart(2)}. ${f.title} (${f.year}) — ${f.overall}/5 — ${f.created_at.slice(0, 10)}`));
  console.log(`\nTotal after merge: ${stats.totalFilms} films | ${stats.totalWatchTime} | avg ${stats.averageRating}/5 | ${stats.directorStats.length} directors`);
  console.log(`\nFiles:\n  backup:  ${backupPath}\n  films:   ${filmsPath}\n  stats:   ${statsPath}`);

  if (PUSH) {
    pushNode('/listOfSeenfilms', filmsPath);
    pushNode('/filmStats', statsPath);
    console.log('\n✅ Pushed to Firebase.');
  } else {
    console.log('\nDRY RUN — nothing written to Firebase. To publish:');
    console.log(`  firebase database:set /listOfSeenfilms ${filmsPath} --project ${CONFIG.firebaseProject} --force`);
    console.log(`  firebase database:set /filmStats ${statsPath} --project ${CONFIG.firebaseProject} --force`);
    console.log('  (or re-run this script with --push)');
  }
}

main().catch((e) => { console.error('❌', e.message); process.exit(1); });
