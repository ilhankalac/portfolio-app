<template>
  <div>
    <p class="fav-intro">
      Ranked by artistic merit, revised after repeat viewings.
    </p>

    <!-- Top 10 -->
    <section>
      <span class="section-eyebrow">
        <UIcon name="i-mdi-trophy-outline" class="eyebrow-icon" />
        Top 10
      </span>

      <div class="top-rail">
        <a
          v-for="film in topFilms"
          :key="film.rank"
          :href="film.url"
          target="_blank"
          rel="noopener noreferrer"
          class="top-card"
          :style="`background-image: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%), url(${film.still});`"
        >
          <span class="top-rank">{{ String(film.rank).padStart(2, '0') }}</span>
          <div class="top-info">
            <span class="top-title">
              {{ film.title }}
              <span v-if="film.isSeries" class="series-tag">Series</span>
            </span>
            <span class="top-meta">{{ shortDirector(film) }} · {{ film.year }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- Lens -->
    <div class="lens-row">
      <button
        v-for="lens in lenses"
        :key="lens.id"
        class="lens-pill"
        :class="{ 'lens-pill--active': activeLens === lens.id }"
        @click="activeLens = lens.id"
      >
        <UIcon :name="lens.icon" class="lens-icon" />
        {{ lens.label }}
        <span v-if="lens.count" class="lens-count">{{ lens.count }}</span>
      </button>
    </div>

    <!-- Ranked list -->
    <div v-for="group in groups" :key="group.label" class="fav-group">
      <div v-if="group.label" class="group-header">
        <span>{{ group.label }}</span>
        <span class="group-count">{{ group.films.length }}</span>
      </div>

      <a
        v-for="film in group.films"
        :key="film.rank"
        :href="film.url"
        target="_blank"
        rel="noopener noreferrer"
        class="fav-row"
      >
        <span class="row-rank">{{ film.rank }}</span>
        <div class="row-body">
          <span class="row-title">
            {{ film.title }}
            <span v-if="film.isSeries" class="series-tag">Series</span>
          </span>
          <span class="row-meta">{{ fullDirectors(film) }} · {{ film.countries[0] }} · {{ film.year }}</span>
        </div>
        <UIcon name="i-mdi-arrow-top-right" class="row-link" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { favoriteFilms, type FavoriteFilm } from '~/data/favoriteFilms'

type Lens = 'all' | 'films' | 'series' | 'decade' | 'director'

interface FilmGroup {
  label: string
  films: FavoriteFilm[]
}

const activeLens = ref<Lens>('all')

const topFilms = favoriteFilms.slice(0, 10)
const seriesCount = favoriteFilms.filter(film => film.isSeries).length

const lenses: { id: Lens, label: string, icon: string, count?: number }[] = [
  { id: 'all', label: 'Sve', icon: 'i-mdi-format-list-numbered', count: favoriteFilms.length },
  { id: 'films', label: 'Filmovi', icon: 'i-mdi-movie-open-outline', count: favoriteFilms.length - seriesCount },
  { id: 'series', label: 'Serije', icon: 'i-mdi-television-classic', count: seriesCount },
  { id: 'decade', label: 'Po deceniji', icon: 'i-mdi-calendar-range' },
  { id: 'director', label: 'Po režiseru', icon: 'i-mdi-account-outline' },
]

const groupBy = (keyOf: (film: FavoriteFilm) => string[]) => {
  const map = new Map<string, FavoriteFilm[]>()
  for (const film of favoriteFilms) {
    for (const key of keyOf(film)) {
      map.set(key, [...(map.get(key) ?? []), film])
    }
  }
  return map
}

const groups = computed<FilmGroup[]>(() => {
  switch (activeLens.value) {
    case 'films':
      return [{ label: '', films: favoriteFilms.filter(film => !film.isSeries) }]
    case 'series':
      return [{ label: '', films: favoriteFilms.filter(film => film.isSeries) }]
    case 'decade':
      return [...groupBy(film => [`${Math.floor(film.year / 10) * 10}s`])]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([label, films]) => ({ label, films }))
    case 'director':
      // Only directors with more than one entry — series credit dozens of one-off episode directors.
      return [...groupBy(film => film.isSeries ? [] : film.directors)]
        .filter(([, films]) => films.length > 1)
        .sort(([, a], [, b]) => b.length - a.length)
        .map(([label, films]) => ({ label, films }))
    default:
      return [{ label: '', films: favoriteFilms.slice(topFilms.length) }]
  }
})

const lastName = (name: string) => name.split(' ').pop() ?? name

const shortDirector = (film: FavoriteFilm) =>
  film.directors.length > 2 ? `${lastName(film.directors[0])} & others` : film.directors.map(lastName).join(', ')

const fullDirectors = (film: FavoriteFilm) =>
  film.directors.length > 2
    ? `${film.directors[0]} & ${film.directors.length - 1} more`
    : film.directors.join(', ')
</script>

<style scoped lang="scss">
.fav-intro {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 0.95rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 1.5rem;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.9rem;
}

.eyebrow-icon {
  color: #818cf8;
}

/* Top 10 */
.top-rail {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 900px) {
    display: flex;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scrollbar-width: thin;
  }
}

.top-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 11rem;
  padding: 0.85rem;
  background-color: rgba(255, 255, 255, 0.04);
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 0.9rem;
  text-decoration: none;
  transition: border-color 0.25s ease, transform 0.25s ease;

  @media (max-width: 900px) {
    flex: 0 0 auto;
    width: 11rem;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(129, 140, 248, 0.35);
  }
}

.top-rank {
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.top-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.top-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}

.top-meta {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
}

.series-tag {
  display: inline-block;
  margin-left: 0.3rem;
  padding: 0.05rem 0.45rem;
  font-size: 0.65rem;
  font-weight: 500;
  vertical-align: middle;
  color: #a5b4fc;
  background: rgba(129, 140, 248, 0.18);
  border-radius: 0.35rem;
}

/* Lens */
.lens-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 2rem 0 0.75rem;
}

.lens-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    border-color: rgba(255, 255, 255, 0.16);
  }

  &--active {
    color: #a5b4fc;
    background: rgba(129, 140, 248, 0.12);
    border-color: rgba(129, 140, 248, 0.35);

    .lens-count { color: rgba(165, 180, 252, 0.6); }
  }
}

.lens-icon {
  font-size: 0.9rem;
}

.lens-count {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  font-variant-numeric: tabular-nums;
}

/* List */
.fav-group + .fav-group {
  margin-top: 1.25rem;
}

.group-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.75rem 0 0.35rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #818cf8;
}

.group-count {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.3);
}

.fav-row {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-decoration: none;

  &:hover {
    .row-title { color: #fff; }
    .row-link { opacity: 1; }
  }
}

.row-rank {
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  font-variant-numeric: tabular-nums;
}

.row-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.row-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  transition: color 0.2s ease;
}

.row-meta {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-link {
  font-size: 1rem;
  color: #818cf8;
  opacity: 0;
  transition: opacity 0.2s ease;
}
</style>
