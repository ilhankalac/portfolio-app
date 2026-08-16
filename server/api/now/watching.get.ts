import { ref, get } from 'firebase/database'

interface WatchedFilm {
  title: string
  year: number
  rating: number
  watchedAt: string
}

/**
 * The three most recently watched films, for the "Watching" column of the hero
 * NOW strip. `created_at` carries no `.indexOn` rule, so the whole node is read
 * and sorted here — this runs once at prerender, not per visitor.
 */
export default defineEventHandler(async (): Promise<WatchedFilm[]> => {
  const db = getFirebaseDb()
  const snapshot = await get(ref(db, 'listOfSeenfilms'))
  const data = snapshot.val()
  if (!data) return []

  const films = (Array.isArray(data) ? data.filter(Boolean) : Object.values(data)) as any[]

  return films
    .filter(film => film?.title && film?.created_at)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)
    .map(film => ({
      title: film.title,
      year: film.year,
      rating: film.overall,
      watchedAt: film.created_at,
    }))
})
