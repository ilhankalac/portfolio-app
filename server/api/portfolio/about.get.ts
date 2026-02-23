import { ref, get } from 'firebase/database'

export default defineEventHandler(async () => {
  const db = getFirebaseDb()
  const snapshot = await get(ref(db, 'about'))
  return snapshot.val()
})
