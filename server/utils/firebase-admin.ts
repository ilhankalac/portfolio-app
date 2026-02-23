import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getDatabase, type Database } from 'firebase/database'

let app: FirebaseApp | undefined
let db: Database | undefined

export function getFirebaseDb(): Database {
  if (!db) {
    const config = useRuntimeConfig()

    if (getApps().length === 0) {
      app = initializeApp({
        apiKey: config.public.firebaseApiKey as string,
        authDomain: config.public.firebaseAuthDomain as string,
        projectId: config.public.firebaseProjectId as string,
        databaseURL: config.public.firebaseDatabaseUrl as string,
      }, 'server')
    } else {
      app = getApps().find(a => a.name === 'server') || getApps()[0]
    }

    db = getDatabase(app)
  }

  return db
}
