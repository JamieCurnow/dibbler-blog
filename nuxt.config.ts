// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxtjs/critters'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { name: 'theme-color', content: '#0ea5a4' },
        { 'http-equiv': 'x-ua-compatible', content: 'IE=edge' }
      ]
    }
  },

  ui: {
    experimental: { componentDetection: true },
    colorMode: false,
    theme: {
      colors: ['primary'],
      transitions: false
    }
  },
  routeRules: {
    '/img/**': {
      // long cache for images
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    },
    '/_ipx/**': {
      // long cache for images
      headers: { 'cache-control': 'public, max-age=31536000, immutable' }
    }
  }
})
