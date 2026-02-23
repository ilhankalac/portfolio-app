import { ref, get } from 'firebase/database'

export default defineEventHandler(async () => {
  const db = getFirebaseDb()
  const snapshot = await get(ref(db, 'working-experience'))
  const data = snapshot.val()
  if (!data) return []

  // Data is stored as { pushKey: [array of experiences] } or { pushKey: { nested } }
  // Flatten all values into a single array
  const result: any[] = []
  for (const value of Object.values(data)) {
    if (Array.isArray(value)) {
      result.push(...value)
    } else {
      result.push(value)
    }
  }
  return result
})
