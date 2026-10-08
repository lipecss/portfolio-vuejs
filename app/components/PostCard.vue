<template>
  <NuxtLink :to="`/post/${post.slug}`" class="lift pop pcard">
    <PostCover :n="post.n" :size="compact ? 'compact' : 'card'" />
    <div class="pcard__body">
      <span class="pcard__tag">{{ postTag(post.title) }}</span>
      <span class="pcard__title">{{ post.title }}</span>
      <span v-if="!compact" class="pcard__meta">{{ formatPostDate(post.created_at) }} · {{ post.readMin }} MIN</span>
    </div>
  </NuxtLink>
</template>

<script setup>
import { formatPostDate, postTag } from '~/data/posts'

defineProps({
  // { n, slug, title, created_at, readMin }
  post: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})
</script>

<style scoped>
.pcard {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--arc-line);
  border-radius: 10px;
  overflow: hidden;
  background: var(--arc-bg);
}

.pcard__body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 auto;
}

.pcard__tag {
  font-family: var(--arc-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--arc-lil);
}

.pcard__title {
  font-size: 23px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--arc-ink);
}

.pcard__meta {
  margin-top: auto;
  padding-top: 8px;
  font-family: var(--arc-mono);
  font-size: 12px;
  color: #8a8499;
}
</style>
