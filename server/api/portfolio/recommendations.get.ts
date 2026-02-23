import { ref, get } from 'firebase/database'

export default defineEventHandler(async () => {
  const db = getFirebaseDb()
  const snapshot = await get(ref(db, 'recommendations'))
  const data = snapshot.val()
  if (!data) return []

  // Data may be an array or an object with keys (mix of numeric "0","1" and push keys)
  const all: any[] = Array.isArray(data)
    ? data.filter(Boolean)
    : Object.values(data)

  return all.filter((rec) => rec && rec.showPublic !== false)
})
