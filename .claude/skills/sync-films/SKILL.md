---
name: sync-films
description: Sync the user's MUBI film ratings into the portfolio's Firebase Realtime Database. Fetches recent ratings from the user's MUBI profile, merges new films into `listOfSeenfilms`, recomputes `filmStats`, and (after confirmation) pushes both to production. Use whenever the user asks to add/update/sync their watched films, "dodaj filmove", "sync mubi", or refresh the film list/stats.
---

# Sync films (MUBI → Firebase)

Adds films the user has rated on MUBI (profile https://mubi.com/en/users/7811688, user id `7811688`)
into the portfolio's Firebase RTDB. The film list lives at the `listOfSeenfilms` node and the
precomputed dashboard numbers live at `filmStats`.

Everything is automated by `scripts/sync-films.mjs`. Do the following:

## Steps

1. **Dry run first.** From the project root:
   ```bash
   node scripts/sync-films.mjs
   ```
   This fetches MUBI ratings, reads the current DB, merges (dedup by title+year), recomputes
   `filmStats`, writes output files to `~/Downloads`, and prints the list of new films. It does
   **not** touch Firebase. It also saves a dated backup of the current `listOfSeenfilms`.

2. **Show the user the summary** — how many new films, their titles/ratings/dates, and the new totals.
   If it says "Already up to date", stop and tell them.

3. **Confirm before publishing.** Pushing writes to the production database, so ask the user to
   confirm (unless they already told you to push/guraj). On confirmation, publish:
   ```bash
   node scripts/sync-films.mjs --push
   ```
   (Re-running is safe — the merge is idempotent; it just re-fetches and pushes the same result.)
   The push uses the `firebase` CLI, which must be logged in as the site owner
   (`firebase login:list` → ilhandeveloper@gmail.com). Project: `portfolio-app-2b6e1`.

4. **Verify** the production data reflects the change:
   ```bash
   curl -s "https://portfolio-app-2b6e1-default-rtdb.europe-west1.firebasedatabase.app/filmStats.json" \
     | python3 -c "import sys,json;d=json.load(sys.stdin);print('totalFilms',d['totalFilms'],'| watchTime',d['totalWatchTime'])"
   ```

## Notes & gotchas

- **MUBI API headers:** requests need `Client: web` and `Client-Country: US`, else it 400s with
  "CLIENT_COUNTRY HTTP HEADER is required".
- **Pagination:** MUBI's public cursor pagination does not advance, so only the ~100 most recent
  ratings are retrievable. That is normally far more than the gap since the last sync. If the user
  ever has >100 unadded films at once, the script will silently miss the oldest — flag this.
- **`filmStats` must be regenerated** whenever films are added; there is no live computation in the
  app — it reads the stored node directly. The script handles this.
- **Rollback:** if a push looks wrong, restore from the dated backup file the dry run wrote:
  `firebase database:set /listOfSeenfilms ~/Downloads/listOfSeenfilms-backup-<date>.json --project portfolio-app-2b6e1 --force`
- The `~/Downloads/*.json` output files are one-off artifacts; they can be deleted after a successful
  push (keep the backup a few days). The reusable tool is `scripts/sync-films.mjs`.
