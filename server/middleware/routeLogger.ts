import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  console.log(`Route logger: [${event.method}] ${event.path}`)
})
