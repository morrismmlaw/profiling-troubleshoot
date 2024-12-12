// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/strapi', '@pinia/nuxt', 'nuxt-tiptap-editor', '@vesp/nuxt-fontawesome', // '@vueform/builder-nuxt' // IT NEED KEYS
  '@vueform/nuxt', '@nuxt/image'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@oruga-ui/theme-bootstrap/dist/bootstrap.css',

    '@fortawesome/fontawesome-free/css/all.min.css',
    'font-awesome/css/font-awesome.css',

    //Shall put Bootstrap Studio CSS order at Last
    '/assets/bootstrap/css/bootstrap.min.css',
    '/assets/fonts/font-awesome.min.css',

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
    url: process.env.STRAPI_URL || 'https://profile-cms.sci.hkbu.edu.hk',
    prefix: '/api',
    admin: '/admin',
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt',

    devtools: true,
  },

  typescript: {
    strict: false
  },

  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  // ssr: false, //Fix for Firefox...
})
