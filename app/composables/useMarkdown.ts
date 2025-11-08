import { toRef, type MaybeRef } from 'vue'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'

// Build the processor once (faster)
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm) // ← tables, task lists, autolinks, strikethrough
  .use(remarkRehype)
  .use(rehypeSlug) // ← adds id="..." to h1–h6 using GitHub-style slugs
  .use(rehypeAutolinkHeadings, {
    behavior: 'append',
    properties: { class: 'heading-anchor' },
    content: {
      type: 'element',
      tagName: 'span',
      properties: { class: 'anchor-icon', 'aria-hidden': 'true' },
      children: [{ type: 'text', value: ' 🔗' }]
    }
  })
  .use(rehypeStringify)

/**
 * Render Markdown to HTML (SSR-safe), with:
 * - GFM tables/task lists
 * - id="" on headings
 * - autolinked headings (append 🔗)
 */
export function useMarkdown(markdown: MaybeRef<string | undefined>) {
  const input = toRef(markdown)
  const html = computed(() => {
    const md = input.value || ''
    const file = processor.processSync(md)
    return String(file)
  })

  return { html }
}
