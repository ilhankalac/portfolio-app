import { ref, get } from 'firebase/database'

export default defineEventHandler(async () => {
  const db = getFirebaseDb()
  const snapshot = await get(ref(db, 'skills'))
  const data = snapshot.val()
  if (!data) return []

  // Data may be an array or an object with keys
  if (Array.isArray(data)) return data.filter(Boolean)
  return Object.values(data)
})
