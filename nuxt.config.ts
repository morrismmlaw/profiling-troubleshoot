// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/strapi', '@pinia/nuxt', 'nuxt-tiptap-editor', '@vesp/nuxt-fontawesome', '@nuxt/image', '@hypernym/nuxt-gsap', 'nuxt-particles', 'nuxt-bootstrap-icons', '@nuxt/fonts'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@oruga-ui/theme-bootstrap/dist/bootstrap.css',
    'bootstrap-icons/font/bootstrap-icons.min.css',

    '@fortawesome/fontawesome-free/css/all.min.css',
    'font-awesome/css/font-awesome.css',

    //Shall put Bootstrap Studio CSS order at Last
    '/assets/bootstrap/css/bootstrap.min.css',
    '/assets/fonts/font-awesome.min.css',

    '/assets/css/_variables.css', //My css for navbar
    '/assets/css/styles.min.css', //My css for BS components

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

  ssr: false, //Fix for Firefox // Bootstrap... 

  // STRAPI TOKEN: 8a2a82b58882d99f781af813ec54b0bdfe773dd755c337081a22f07b33b81875005fb6004ffe9e08c575ff66e4d5f72645cd28286ed1307e70467ff65a6dbb804d8ce0c972515357c7b8693600380878fb497a2dff49f32e3da5ccdf3972bcb7b23781570af4c55fa1a690c344fa8ff430e689a946425dfcca7ac80c5f48d3d1
})