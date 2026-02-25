import { ref, get } from 'firebase/database'

export default defineEventHandler(async () => {
  const db = getFirebaseDb()
  const snapshot = await get(ref(db, 'free-time-projects'))
  const data = snapshot.val()
  if (!data) return []

  // Data may be an array or an object with keys
  const all = Array.isArray(data) ? data.filter(Boolean) : Object.values(data) as any[]
  return all.map((p) => ({ ...p, image: mapImageUrl(p.image) }))
})
