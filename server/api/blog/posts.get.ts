import { ref, get } from 'firebase/database'

export default defineEventHandler(async () => {
  const db = getFirebaseDb()
  const snapshot = await get(ref(db, 'blog/posts'))
  const val = snapshot.val()
  if (!val) return []

  return Object.entries(val)
    .map(([key, value]: [string, any]) => ({
      ...value,
      slug: (value as any).slug || key,
    }))
    .sort((a: any, b: any) => {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    })
})
