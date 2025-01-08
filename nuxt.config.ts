export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-vuefire'],
  imports: {
    dirs: ['stores']
  },
  plugins: [
    '~/plugins/firebase.ts',
  ],
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyCvjY8G_24WwOU_X2QnqpOk6mBHnhhly5c",
      authDomain: "scentbook-d97e9.firebaseapp.com",
      projectId: "scentbook-d97e9",
      storageBucket: "scentbook-d97e9.firebasestorage.app",
      messagingSenderId: "1023901114380",
      appId: "1:1023901114380:web:6c291d4a56cbe36fef8e29",
    },
  },

})