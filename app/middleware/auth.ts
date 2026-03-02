export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth check on server — Firebase auth only works client-side.
  // The client will handle the redirect after hydration.
  if (import.meta.server) return

  const { $firebaseAuth, $onAuthStateChanged } = useNuxtApp()

  const getCurrentUser = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const removeListener = $onAuthStateChanged($firebaseAuth, (user: any) => {
        removeListener()
        resolve(user)
      }, reject)
    })
  }

  const user = await getCurrentUser()
  if (!user) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})
