import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,  
	projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,	
	storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
	databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const firebaseDatabase = getDatabase(firebaseApp)
const firebaseAuth = getAuth(firebaseApp)
const signIn = signInWithEmailAndPassword
const _onAuthStateChanged = onAuthStateChanged
const logOut = signOut

export { firebaseApp, firebaseDatabase, firebaseAuth, signIn, _onAuthStateChanged, logOut}