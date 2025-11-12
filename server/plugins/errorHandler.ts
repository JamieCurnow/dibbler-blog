import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('error', async (error, { event }) => {
    console.error(`[${event?.method}] ${event?.path} Application error:`, error)
  })
})
