import { ref, get } from 'firebase/database'

export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key')
  if (!key) {
    throw createError({ statusCode: 400, message: 'Missing blog key' })
  }

  const db = getFirebaseDb()
  const snapshot = await get(ref(db, `blog/posts/${key}`))
  const val = snapshot.val()

  if (!val) {
    throw createError({ statusCode: 404, message: 'Blog post not found' })
  }

  return { ...val, firebaseKey: key }
})
