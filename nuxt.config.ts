// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    'nuxt-tiptap-editor',
    '@vesp/nuxt-fontawesome',
    '@vueform/nuxt',
    // '@vueform/builder-nuxt' // IT NEED KEYS
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    // 'font-awesome/css/font-awesome.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
  ],

  plugins: [{ src: '~/plugins/oruga.js' }],

  fontawesome: {
    component: "fa",
    icons: {
      solid: ['dollar-sign', 'cog', 'circle', 'check', 'calendar'],
      regular: ['user']
    }
  },

  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },

  strapi: {
    url: process.env.STRAPI_URL || 'http://158.182.151.62:1337',
    prefix: '/api',
    admin: '/admin',
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt'
  },

  typescript: {
    strict: false
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
