// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  ssr: true,

  nitro: {
    preset: 'node-server',
  },

  routeRules: {
    '/blogs/**': { ssr: true },
    '/favorite-quotes/**': { ssr: true },
    '/list-of-seen-films': { ssr: true },
  },

  experimental: {},

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Ilhan Kalač — Software Engineer specializing in web development. Explore my experience, projects, and skills.' },
        { name: 'author', content: 'Ilhan Kalač' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ilhan.io' },
        { property: 'og:title', content: 'Ilhan Kalač — Software Engineer' },
        { property: 'og:description', content: 'Software Engineer specializing in web development. Explore my experience, projects, and skills.' },
        { property: 'og:image', content: 'https://ilhan.io/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Ilhan Kalač — Software Engineer' },
        { name: 'twitter:description', content: 'Software Engineer specializing in web development. Explore my experience, projects, and skills.' },
        { name: 'twitter:image', content: 'https://ilhan.io/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/profile.ico' },
        { rel: 'canonical', href: 'https://ilhan.io' },
      ],
    },
  },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
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

  sitemap: {
    siteUrl: 'https://ilhan.io',
    exclude: ['/admin-panel/**', '/create-realtime-data', '/login'],
  },

  compatibilityDate: '2025-01-01',
})
