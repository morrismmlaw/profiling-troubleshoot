// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/strapi', '@pinia/nuxt',
    'nuxt-tiptap-editor', '@vesp/nuxt-fontawesome',
    '@nuxt/image', '@hypernym/nuxt-gsap',
    'nuxt-particles', 'nuxt-bootstrap-icons',
    '@nuxt/fonts', '@bootstrap-vue-next/nuxt'],

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

  plugins: [
    {
      src: '~/plugins/oruga.js'
    },
    {
      src: '~/plugins/vue-advanced-cropper.ts'
    }
  ],

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

  ssr: false, //Fix for Firefox...
})
