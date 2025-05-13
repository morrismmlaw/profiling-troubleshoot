// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/strapi', '@pinia/nuxt',
    'nuxt-tiptap-editor', '@vesp/nuxt-fontawesome',
    '@nuxt/image', '@hypernym/nuxt-gsap',
    'nuxt-particles', 'nuxt-bootstrap-icons',
    '@nuxt/fonts', '@bootstrap-vue-next/nuxt', 'nuxt-meilisearch'],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@oruga-ui/theme-bootstrap/dist/bootstrap.css',
    '/assets/css/oruga-custom.scss',
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

  meilisearch: {
    hostUrl: 'http://158.182.151.62:7700', //required
    searchApiKey: 'e5e806a91bca2b6b58ed2aebba3a6a873bfddcf834cbf1c3dcc7418785f36dac', // required
    adminApiKey: '<admin_api_key>', // optional
    serverSideUsage: true // default: false
    //bearer token: 'Strd8oz_m6pgKbml-ivcANsCHfz55IyJD9S-L6pJiCY';
  },

  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // see: https://vite.dev/config/shared-options.html#css-preprocessoroptions
          api: 'modern',
        }
      }
    }
  },

  ssr: false, //Fix for Firefox...
})
