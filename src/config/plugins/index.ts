/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/config/router'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App, firebaseApp: any) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(firebaseApp)
}
