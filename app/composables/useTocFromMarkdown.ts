import { ref, watch, toRef, type MaybeRef } from 'vue'

export interface TocItem {
  id: string
  text: string
  level: number
  link: string
}

export function useTocFromMarkdown(markdown: MaybeRef<string | undefined>) {
  const markdownRef = toRef(markdown)
  const toc = ref<TocItem[]>([])

  const buildToc = (src?: string) => {
    if (!src) {
      toc.value = []
      return
    }

    const regex = /^(#{1,3})\s+(.+)$/gm
    const matches = [...src.matchAll(regex)]

    toc.value = matches.map(([, hashes, title]) => {
      if (!hashes || !title) throw new Error('Invalid match in TOC generation')
      const level = hashes.length
      const slug = slugify(title)
      return {
        id: slug,
        text: title.trim(),
        level,
        link: `#${slug}`
      }
    })
  }

  watch(markdownRef, (newVal) => buildToc(newVal), { immediate: true })

  return { toc }
}

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      // replace things like question marks with ''
      .replace(/[?&\/\\#,+()$~%.'":*?<>{}]/g, '')
      // Replace emoji & pictographs with '-'
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]/gu, '-')
      // Replace anything else non-word with '-'
      .replace(/[^\w]+/g, '-')
    // Trim leading/trailing '-'
    // .replace(/^-+|-+$/g, '')
  )
}
