// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  ssr: true,

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  googleFonts: {
    families: {
      Roboto: [100, 300, 400, 500, 700, 900],
      Inter: [400, 500, 600, 700],
      'Be Vietnam Pro': [400, 500, 700],
      'Bebas Neue': [400],
      Poppins: [300, 400, 500, 600],
    },
    display: 'swap',
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      firebaseMeasurementId: '',
      firebaseDatabaseUrl: '',
    }
  },

  compatibilityDate: '2025-01-01',
})
