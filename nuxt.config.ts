export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['stores']
  },
  css: [
    'vuetify/styles',
  ],
  build: {
    transpile: ['vuetify'],
  },
})