export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

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
