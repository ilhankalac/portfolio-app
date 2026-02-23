import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey as string,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    storageBucket: config.public.firebaseStorageBucket as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string,
    measurementId: config.public.firebaseMeasurementId as string,
    databaseURL: config.public.firebaseDatabaseUrl as string,
  }

  const firebaseApp = initializeApp(firebaseConfig)
  const firebaseDatabase = getDatabase(firebaseApp)
  const firebaseAuth = getAuth(firebaseApp)

  return {
    provide: {
      firebaseDatabase,
      firebaseAuth,
      signIn: signInWithEmailAndPassword,
      onAuthStateChanged,
      logOut: signOut,
    }
  }
})
