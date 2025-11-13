const hourCache = {
  // cache author data for 1 hour with s-maxage for CDN caching and stale-while-revalidate
  'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600'
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    mongoUri: ''
  },
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxtjs/critters', '@vueuse/nuxt'],
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
    },
    '/api/author/**': {
      headers: hourCache
    },
    '/api/post/**': {
      headers: hourCache
    },
    '/author/**': {
      headers: hourCache
    },
    '/post/**': {
      headers: hourCache
    }
  }
})