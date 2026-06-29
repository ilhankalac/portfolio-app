<template>
  <div>
    <!-- Loading -->
    <div v-if="status === 'pending'" class="post-skeleton">
      <div class="skeleton-back" />
      <div class="skeleton-title" />
      <div class="skeleton-meta" />
      <div class="skeleton-hero" />
      <div class="skeleton-line" v-for="i in 6" :key="i" :style="{ width: `${60 + Math.random() * 40}%` }" />
    </div>

    <!-- Post -->
    <div v-else-if="blog" class="post">
      <!-- Back button -->
      <button class="back-btn" @click="navigateTo('/blogs')">
        <UIcon name="i-mdi-arrow-left" class="back-icon" />
        Back to posts
      </button>

      <!-- Title -->
      <h1 class="post-title">{{ blog.title }}</h1>

      <!-- Meta row -->
      <div class="post-meta">
        <div class="meta-left">
          <div class="author-avatar">
            {{ getInitial(blog.author) }}
          </div>
          <div class="meta-info">
            <span class="meta-author">{{ blog.author }}</span>
            <span class="meta-date">{{ blog.date }}</span>
          </div>
        </div>
        <div class="meta-right">
          <span v-if="readingTime" class="reading-pill">
            {{ readingTime }} min read
          </span>
        </div>
      </div>

      <!-- Share buttons -->
      <div class="share-row">
        <NuxtLink
          v-if="blog.altSlug"
          class="share-btn lang-btn"
          :to="`/blogs/${blog.altSlug}`"
        >
          <UIcon name="i-mdi-translate" />
          {{ blog.lang === 'en' ? 'Pročitaj na našem jeziku' : 'Read in English' }}
        </NuxtLink>
        <button class="share-btn" @click="copyLink" :title="copied ? 'Copied!' : 'Copy link'">
          <UIcon :name="copied ? 'i-mdi-check' : 'i-mdi-link-variant'" />
          {{ copied ? 'Copied' : 'Copy link' }}
        </button>
        <a
          class="share-btn"
          :href="`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`"
          target="_blank"
          rel="noopener"
        >
          <UIcon name="i-mdi-twitter" />
          Tweet
        </a>
        <a
          class="share-btn"
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`"
          target="_blank"
          rel="noopener"
        >
          <UIcon name="i-mdi-linkedin" />
          Share
        </a>
      </div>

      <!-- Hero image -->
      <div v-if="blog.image" class="post-hero">
        <img :src="blog.image" :alt="blog.title" class="post-hero-img" />
      </div>

      <!-- Content -->
      <div class="blog-content" role="main">
        <ContentRenderer v-if="blog" :value="blog" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blog' })

const route = useRoute()
const slug = computed(() => route.params.id as string)

const { data: blog, status } = await useAsyncData(
  () => `blog-${slug.value}`,
  () => queryCollection('blogs').path(`/blogs/${slug.value}`).first(),
  { watch: [slug] },
)

if (!blog.value) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found', fatal: true })
}

const blogDescription = computed(() => blog.value?.description || '')

useHead({
  title: () => blog.value?.title ? `${blog.value.title} — Ilhan Kalač` : 'Blog — Ilhan Kalač',
  link: [
    { rel: 'canonical', href: `https://ilhan.io${route.fullPath}` },
  ],
})

useSeoMeta({
  description: () => blogDescription.value,
  ogType: 'article',
  ogTitle: () => blog.value?.title || 'Blog — Ilhan Kalač',
  ogDescription: () => blogDescription.value,
  ogImage: () => blog.value?.image || 'https://ilhan.io/og-image.jpg',
  ogUrl: () => `https://ilhan.io${route.fullPath}`,
  twitterCard: 'summary_large_image',
  twitterTitle: () => blog.value?.title || 'Blog — Ilhan Kalač',
  twitterDescription: () => blogDescription.value,
  twitterImage: () => blog.value?.image || 'https://ilhan.io/og-image.jpg',
  articleAuthor: () => blog.value?.author || 'Ilhan Kalač',
  articlePublishedTime: () => blog.value?.publishedAt || '',
})

const copied = ref(false)

const readingTime = computed(() => blog.value?.readingTime || 0)

const currentUrl = computed(() => {
  if (import.meta.client) return window.location.href
  return ''
})

const encodedUrl = computed(() => encodeURIComponent(currentUrl.value))
const encodedTitle = computed(() => encodeURIComponent(blog.value?.title || ''))

const getInitial = (name: string | undefined | null) => {
  return name ? name.charAt(0).toUpperCase() : '?'
}

const copyLink = async () => {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {}
}
</script>

<style>
/* === Global blog content styles === */
.blog-content ul {
  list-style-type: disc !important;
  padding-left: 40px !important;
  margin: 1em 0 !important;
}

.blog-content ul li {
  display: list-item !important;
  list-style-type: disc !important;
  margin-bottom: 0.5em !important;
  color: rgba(255, 255, 255, 0.8) !important;
}

.blog-content ul li p {
  display: inline !important;
  margin: 0 !important;
}

.blog-content ol {
  list-style-type: decimal !important;
  padding-left: 40px !important;
  margin: 1em 0 !important;
}

.blog-content ol li {
  display: list-item !important;
  list-style-type: decimal !important;
  margin-bottom: 0.5em !important;
  color: rgba(255, 255, 255, 0.8) !important;
}

.blog-content ol li p {
  display: inline !important;
  margin: 0 !important;
}

.blog-content p:empty {
  margin: 0 !important;
  padding: 0 !important;
  line-height: 0 !important;
}

.blog-content img,
.blog-content .blog-image {
  display: block !important;
  width: 100% !important;
  height: auto !important;
  border-radius: 0.75rem !important;
}

.blog-content p.image-caption {
  background-color: rgba(129, 140, 248, 0.15) !important;
  color: rgba(255, 255, 255, 0.7) !important;
  padding: 12px 16px !important;
  text-align: center !important;
  font-size: 0.85rem !important;
  font-style: italic !important;
  margin: 0 0 1.5em 0 !important;
  border-radius: 0 0 0.75rem 0.75rem !important;
}

.blog-content img:not(:has(+ p.image-caption)),
.blog-content .blog-image:not(:has(+ p.image-caption)) {
  margin-bottom: 1.5em !important;
}

/* Links - critical fix: using visible indigo instead of invisible primary */
.blog-content a,
.blog-content a:link,
.blog-content a:visited,
.blog-content a:active,
.blog-content p a,
.blog-content p a strong,
.blog-content p strong a {
  color: #818cf8 !important;
  text-decoration: none !important;
  border-bottom: none !important;
}

.blog-content a:hover,
.blog-content p a:hover {
  color: #a5b4fc !important;
  text-decoration: underline !important;
}
</style>

<style scoped lang="scss">
/* Back button */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0;
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #818cf8;
  }
}

.back-icon {
  font-size: 1rem;
}

/* Title */
.post-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.25;
  letter-spacing: -0.025em;
  margin: 0 0 1.25rem;
}

/* Meta row */
.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: rgba(129, 140, 248, 0.15);
  color: #818cf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.meta-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.meta-author {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.meta-date {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.35);
}

.meta-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reading-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.65rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9999px;
  white-space: nowrap;
}

/* Share buttons */
.share-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

.lang-btn {
  color: #818cf8;
  background: rgba(129, 140, 248, 0.1);
  border-color: rgba(129, 140, 248, 0.25);

  &:hover {
    color: #a5b4fc;
    background: rgba(129, 140, 248, 0.18);
    border-color: rgba(129, 140, 248, 0.4);
  }
}

/* Hero image */
.post-hero {
  margin-bottom: 2rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.post-hero-img {
  width: 100%;
  height: auto;
  display: block;
}

/* Blog content (scoped overrides for :deep) */
.blog-content {
  color: rgba(255, 255, 255, 0.8);
  padding: 0;
  line-height: 1.75;
  font-size: 1rem;
  word-wrap: break-word;
  overflow-x: hidden;
}

.blog-content :deep(h1) {
  font-size: 1.875em;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-top: 1.5em;
  margin-bottom: 0.6em;
  line-height: 1.25;
  letter-spacing: -0.025em;
}

.blog-content :deep(h2) {
  font-size: 1.5em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-top: 1.4em;
  margin-bottom: 0.5em;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.blog-content :deep(h3) {
  font-size: 1.25em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 1.2em;
  margin-bottom: 0.4em;
  line-height: 1.35;
}

.blog-content :deep(p) {
  margin: 0.75em 0;
  white-space: pre-wrap;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.8);
}

.blog-content :deep(br) {
  display: block;
  margin: 0.5em 0;
  line-height: 1.75;
}

.blog-content :deep(code) {
  background-color: rgba(255, 255, 255, 0.08);
  color: #818cf8;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.875em;
}

.blog-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.25rem !important;
  border-radius: 0.75rem !important;
  overflow-x: auto;
  margin: 1.75em 0 !important;
}

.blog-content :deep(pre code) {
  background-color: transparent !important;
  color: inherit !important;
  padding: 0 !important;
  border-radius: 0 !important;
  font-size: 0.875em;
  font-family: 'Courier New', Courier, monospace;
  display: block;
  line-height: 1.6;
}

.blog-content :deep(ul) {
  list-style-type: disc !important;
  margin-left: 0 !important;
  padding-left: 40px !important;
  margin-top: 1em !important;
  margin-bottom: 1em !important;
}

.blog-content :deep(ul li) {
  display: list-item !important;
  list-style-type: disc !important;
  margin-left: 0 !important;
  padding-left: 0 !important;
  margin-bottom: 0.5em !important;
}

.blog-content :deep(ul li p) {
  display: inline !important;
  margin: 0 !important;
  padding: 0 !important;
}

.blog-content :deep(ol) {
  list-style-type: decimal !important;
  margin-left: 0 !important;
  padding-left: 40px !important;
  margin-top: 1em !important;
  margin-bottom: 1em !important;
}

.blog-content :deep(ol li) {
  display: list-item !important;
  list-style-type: decimal !important;
  margin-left: 0 !important;
  padding-left: 0 !important;
  margin-bottom: 0.5em !important;
}

.blog-content :deep(ol li p) {
  display: inline !important;
  margin: 0 !important;
  padding: 0 !important;
}

.blog-content :deep(a),
.blog-content :deep(a:link),
.blog-content :deep(a:visited),
.blog-content :deep(a:active) {
  color: #818cf8 !important;
  text-decoration: none !important;
  border-bottom: none !important;
  cursor: pointer;
}

.blog-content :deep(a:hover) {
  color: #a5b4fc !important;
  text-decoration: underline !important;
}

.blog-content :deep(a strong),
.blog-content :deep(strong a) {
  color: #818cf8 !important;
  text-decoration: none !important;
}

.blog-content :deep(p a),
.blog-content :deep(p a strong),
.blog-content :deep(p strong a) {
  color: #818cf8 !important;
  text-decoration: none !important;
  border-bottom: none !important;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #4f46e5;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
}

.blog-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 2em 0;
}

.blog-content :deep(strong) {
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.blog-content :deep(em) {
  font-style: italic;
}

.blog-content :deep(u) {
  text-decoration: underline;
}

.blog-content :deep(img),
.blog-content :deep(.blog-image) {
  display: block !important;
  margin: 1.5em auto !important;
  max-width: 100% !important;
  height: auto !important;
  border-radius: 0.75rem !important;
}

:deep(.htmlImage img) {
  width: 100% !important;
  height: 100%;
  object-fit: cover;
  margin: 10px 0;
  border-radius: 0.75rem;
}

/* Skeleton loading */
.post-skeleton {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-back {
  width: 8rem;
  height: 1rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-title {
  width: 70%;
  height: 2rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-meta {
  width: 40%;
  height: 1rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-hero {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-line {
  height: 0.85rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Responsive */
@media (max-width: 640px) {
  .post-title {
    font-size: 1.5rem;
  }

  .blog-content {
    font-size: 1rem;
  }

  .share-row {
    flex-wrap: wrap;
  }
}
</style>
