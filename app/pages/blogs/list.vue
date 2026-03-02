<template>
  <div>
    <!-- Section header -->
    <div class="list-header">
      <span class="list-label">Blog</span>
      <h1 class="list-title">Thoughts &amp; Knowledge</h1>
      <p class="list-subtitle">
        Collection of my thoughts and knowledge shared with the world.
      </p>
    </div>

    <!-- Loading skeleton -->
    <div v-if="status === 'pending'" class="blog-grid">
      <div v-for="i in 4" :key="i" class="skeleton-card">
        <div class="skeleton-image" />
        <div class="skeleton-body">
          <div class="skeleton-line skeleton-line--title" />
          <div class="skeleton-line skeleton-line--text" />
          <div class="skeleton-line skeleton-line--short" />
        </div>
      </div>
    </div>

    <!-- Blog cards -->
    <div v-else class="blog-grid">
      <NuxtLink
        v-for="(blog, index) in blogs"
        :key="blog.slug"
        :to="getBlogUrl(blog)"
        class="blog-card"
        :style="{ '--delay': `${index * 120}ms` }"
      >
        <!-- Image -->
        <div class="card-image-wrap">
          <img
            v-if="blog.image"
            :src="blog.image"
            :alt="blog.title"
            class="card-image"
          />
          <div v-else class="card-image-placeholder">
            <UIcon name="i-mdi-post-outline" class="placeholder-icon" />
          </div>
          <div class="card-image-gradient" />
        </div>

        <!-- Body -->
        <div class="card-body">
          <h3 class="card-title">{{ blog.title }}</h3>
          <p v-if="getExcerpt(blog)" class="card-excerpt">{{ getExcerpt(blog) }}</p>

          <div class="card-footer">
            <div class="card-meta">
              <span class="card-author">{{ blog.author }}</span>
              <span class="card-dot">&middot;</span>
              <span class="card-date">{{ blog.date }}</span>
            </div>
            <span v-if="getReadingTime(blog)" class="reading-pill">
              {{ getReadingTime(blog) }} min read
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blog' })

useHead({
  title: 'Blog — Ilhan Kalač',
  link: [{ rel: 'canonical', href: 'https://ilhan.io/blogs/list' }],
})

useSeoMeta({
  description: 'Collection of thoughts and knowledge shared by Ilhan Kalač — Software Engineer.',
  ogType: 'website',
  ogTitle: 'Blog — Ilhan Kalač',
  ogDescription: 'Collection of thoughts and knowledge shared by Ilhan Kalač — Software Engineer.',
  ogImage: 'https://ilhan.io/og-image.jpg',
  ogUrl: 'https://ilhan.io/blogs/list',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Blog — Ilhan Kalač',
  twitterDescription: 'Collection of thoughts and knowledge shared by Ilhan Kalač — Software Engineer.',
  twitterImage: 'https://ilhan.io/og-image.jpg',
})

const { data: blogs, status } = await useFetch<any[]>('/api/blog/posts', { default: () => [] })

const getBlogUrl = (blog: any) => {
  return `/blogs/${blog.slug}`
}

const stripHtml = (html: string): string => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}

const getExcerpt = (blog: any): string => {
  const text = stripHtml(blog.html || blog.description || '')
  if (!text) return ''
  return text.length > 120 ? text.slice(0, 120) + '...' : text
}

const getReadingTime = (blog: any): number => {
  const text = stripHtml(blog.html || '')
  if (!text) return 0
  const words = text.split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
</script>

<style scoped lang="scss">
.list-header {
  padding-bottom: 1.5rem;
}

.list-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #818cf8;
  margin-bottom: 0.4rem;
}

.list-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.list-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0.5rem 0 0;
  line-height: 1.6;
}

/* Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

/* Card */
.blog-card {
  text-decoration: none;
  color: inherit;
  display: block;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease;
  animation: cardFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.1);

    .card-image {
      transform: scale(1.05);
    }
  }
}

/* Card image */
.card-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
}

.placeholder-icon {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.1);
}

.card-image-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(15, 23, 42, 0.8) 100%
  );
  pointer-events: none;
}

/* Card body */
.card-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.0625rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.35);
}

.card-author {
  font-weight: 500;
}

.card-dot {
  opacity: 0.5;
}

.card-date {
  opacity: 0.8;
}

.reading-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9999px;
  white-space: nowrap;
}

/* Skeleton loading */
.skeleton-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  overflow: hidden;
}

.skeleton-image {
  aspect-ratio: 16 / 10;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

.skeleton-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 0.75rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  animation: skeletonPulse 1.5s ease-in-out infinite;

  &--title {
    width: 80%;
    height: 0.95rem;
  }

  &--text {
    width: 100%;
  }

  &--short {
    width: 40%;
  }
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
