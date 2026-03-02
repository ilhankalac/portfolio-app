import { ref, get } from 'firebase/database'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing blog slug' })
  }

  const db = getFirebaseDb()
  const snapshot = await get(ref(db, `blog/posts/${slug}`))
  const val = snapshot.val()

  if (!val) {
    throw createError({ statusCode: 404, message: 'Blog post not found' })
  }

  return { ...val, slug }
})
