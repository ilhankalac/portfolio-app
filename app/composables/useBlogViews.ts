import { ref as dbRef, get, runTransaction } from 'firebase/database'

/**
 * View counts per blog post, stored in Realtime Database under `blogViews/{slug}`.
 * The site is statically generated, so counting happens in the browser; the
 * database rules only let anonymous visitors raise a count by exactly one.
 */
export function useBlogViews() {
  const getDb = () => useNuxtApp().$firebaseDatabase

  const getAllViews = async (): Promise<Record<string, number>> => {
    const snapshot = await get(dbRef(getDb(), 'blogViews'))
    return snapshot.val() ?? {}
  }

  /** Counts one view per post per browser session and returns the new total. */
  const trackView = async (slug: string): Promise<number | null> => {
    const viewRef = dbRef(getDb(), `blogViews/${slug}`)
    const sessionKey = `blog-viewed:${slug}`

    let alreadyCounted = false
    try {
      alreadyCounted = sessionStorage.getItem(sessionKey) === '1'
    } catch {}

    if (alreadyCounted || import.meta.dev) {
      const snapshot = await get(viewRef)
      return snapshot.val()
    }

    const result = await runTransaction(viewRef, current => (current ?? 0) + 1)
    try {
      sessionStorage.setItem(sessionKey, '1')
    } catch {}
    return result.snapshot.val()
  }

  return { getAllViews, trackView }
}
