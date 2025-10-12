/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/config/plugins'
import { firebaseApp } from '@/config/firebase.config'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.component('QuillEditor')
registerPlugins(app, firebaseApp)

app.mount('#app')
