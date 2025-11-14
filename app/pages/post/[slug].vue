<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-16">
        <!-- Main Content -->
        <article class="lg:col-span-8">
          <PostHeader :title="post.title" :subtitle="post.subtitle" :date-published="post.datePublished" />

          <PostCoverImage :image="post.coverImage" :title="post.title" />

          <PostAuthorCard :author="post.author" />

          <AtAGlance v-if="post.atAGlance" :data="post.atAGlance" />

          <!-- Post Content -->
          <div class="prose prose-lg dark:prose-invert max-w-none markdown" v-html="html"></div>
        </article>

        <StickyToc :toc="toc" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AtAGlance from '~~/app/components/AtAGlance.vue'
import PostHeader from '~~/app/components/PostHeader.vue'
import PostCoverImage from '~~/app/components/PostCoverImage.vue'
import PostAuthorCard from '~~/app/components/PostAuthorCard.vue'
import StickyToc from '~~/app/components/StickyToc.vue'

const slug = useRoute().params.slug as string

const { data } = await useFetch<BlogPost>(`/api/post/${slug}`)
const post = data.value
if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })
}

// head
useBlogMeta(post)

// markdown rendering
const { html } = useMarkdown(post.content)

// toc
const { toc } = useTocFromMarkdown(post.content)
</script>
