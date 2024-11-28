// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxtjs/strapi', '@pinia/nuxt', 'nuxt-tiptap-editor'],

  css: ['bootstrap/dist/css/bootstrap.min.css'],

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