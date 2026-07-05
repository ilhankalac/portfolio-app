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

    <!-- Tag filter -->
    <div v-if="allTags.length" class="tag-filter">
      <button
        class="tag-pill"
        :class="{ 'tag-pill--active': activeTag === null }"
        @click="activeTag = null"
      >
        All
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="tag-pill"
        :class="{ 'tag-pill--active': activeTag === tag }"
        @click="activeTag = activeTag === tag ? null : tag"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="status === 'pending'" class="skeleton-wrap">
      <div class="skeleton-featured" />
      <div v-for="i in 3" :key="i" class="skeleton-row" />
    </div>

    <template v-else>
      <!-- Featured post (latest, only without an active filter) -->
      <NuxtLink
        v-if="featured"
        :to="featured.path"
        class="featured-card"
      >
        <div class="featured-image-wrap">
          <img
            v-if="featured.image"
            :src="featured.image"
            :alt="featured.title"
            class="featured-image"
          />
          <div v-else class="featured-image-placeholder">
            <UIcon name="i-mdi-post-outline" class="placeholder-icon" />
          </div>
          <div class="featured-gradient" />
          <span class="featured-badge">Latest</span>
        </div>

        <div class="featured-body">
          <div class="featured-meta">
            <span class="meta-date">{{ formatDate(featured.publishedAt) }}</span>
            <span class="meta-dot">&middot;</span>
            <span v-if="featured.readingTime" class="meta-read">{{ featured.readingTime }} min read</span>
            <span
              v-for="tag in featured.tags"
              :key="tag"
              class="meta-tag"
            >{{ tag }}</span>
          </div>
          <h2 class="featured-title">{{ featured.title }}</h2>
          <p v-if="featured.description" class="featured-excerpt">{{ featured.description }}</p>
          <span class="featured-cta">
            Read post
            <UIcon name="i-mdi-arrow-right" class="cta-icon" />
          </span>
        </div>
      </NuxtLink>

      <!-- Editorial list, grouped by year -->
      <div v-if="groupedPosts.length" class="post-list">
        <section
          v-for="group in groupedPosts"
          :key="group.year"
          class="year-group"
        >
          <div class="year-heading">
            <span class="year-label">{{ group.year }}</span>
            <div class="year-line" />
          </div>

          <NuxtLink
            v-for="post in group.posts"
            :key="post.path"
            :to="post.path"
            class="post-row"
          >
            <span class="row-date">{{ formatShortDate(post.publishedAt) }}</span>
            <div class="row-main">
              <h3 class="row-title">{{ post.title }}</h3>
              <p v-if="post.description" class="row-excerpt">{{ post.description }}</p>
            </div>
            <div class="row-side">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="row-tag"
              >{{ tag }}</span>
              <span v-if="post.readingTime" class="row-read">{{ post.readingTime }} min</span>
              <UIcon name="i-mdi-arrow-right" class="row-arrow" />
            </div>
          </NuxtLink>
        </section>
      </div>

      <!-- Empty state for a filter with no matches -->
      <p v-else-if="!featured" class="empty-state">
        No posts tagged “{{ activeTag }}” yet.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blog' })

useHead({
  title: 'Blog — Ilhan Kalač',
  link: [{ rel: 'canonical', href: 'https://ilhan.io/blogs' }],
})

useSeoMeta({
  description: 'Collection of thoughts and knowledge shared by Ilhan Kalač — Software Engineer.',
  ogType: 'website',
  ogTitle: 'Blog — Ilhan Kalač',
  ogDescription: 'Collection of thoughts and knowledge shared by Ilhan Kalač — Software Engineer.',
  ogImage: 'https://ilhan.io/og-image.jpg',
  ogUrl: 'https://ilhan.io/blogs',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Blog — Ilhan Kalač',
  twitterDescription: 'Collection of thoughts and knowledge shared by Ilhan Kalač — Software Engineer.',
  twitterImage: 'https://ilhan.io/og-image.jpg',
})

const { data: blogs, status } = await useAsyncData('blog-list', async () => {
  const all = await queryCollection('blogs')
    .select('title', 'description', 'author', 'date', 'image', 'publishedAt', 'readingTime', 'path', 'lang', 'tags')
    .order('publishedAt', 'DESC')
    .all()
  // Hide alternate-language versions from the listing; show only primary posts.
  return all.filter(blog => blog.lang !== 'en')
},
  { default: () => [] },
)

const activeTag = ref<string | null>(null)

const allTags = computed(() => {
  const tags = new Set<string>()
  for (const blog of blogs.value) {
    for (const tag of blog.tags ?? []) tags.add(tag)
  }
  return [...tags].sort()
})

const filtered = computed(() => {
  if (!activeTag.value) return blogs.value
  return blogs.value.filter(blog => blog.tags?.includes(activeTag.value!))
})

// Featured = newest post, only when browsing without a filter.
const featured = computed(() => (activeTag.value ? null : filtered.value[0] ?? null))

const listPosts = computed(() => (activeTag.value ? filtered.value : filtered.value.slice(1)))

const groupedPosts = computed(() => {
  const groups = new Map<string, typeof listPosts.value>()
  for (const post of listPosts.value) {
    const year = post.publishedAt?.slice(0, 4) ?? '—'
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year)!.push(post)
  }
  return [...groups.entries()].map(([year, posts]) => ({ year, posts }))
})

const formatDate = (iso?: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatShortDate = (iso?: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<style scoped lang="scss">
.list-header {
  padding-bottom: 1.25rem;
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

/* Tag filter */
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.75rem;
}

.tag-pill {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 255, 255, 0.15);
  }

  &--active {
    color: #a5b4fc;
    background: rgba(129, 140, 248, 0.12);
    border-color: rgba(129, 140, 248, 0.35);
  }
}

/* Featured card */
.featured-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 2.5rem;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.35s ease;
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.45);

    .featured-image {
      transform: scale(1.04);
    }

    .featured-cta {
      color: #a5b4fc;

      .cta-icon {
        transform: translateX(3px);
      }
    }
  }
}

.featured-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 21 / 9;

  @media (max-width: 640px) {
    aspect-ratio: 16 / 10;
  }
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
}

.placeholder-icon {
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.1);
}

.featured-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(10, 14, 26, 0.75) 100%);
  pointer-events: none;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #a5b4fc;
  padding: 0.3rem 0.7rem;
  border-radius: 9999px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(129, 140, 248, 0.35);
  backdrop-filter: blur(8px);
}

.featured-body {
  padding: 1.5rem 1.75rem 1.75rem;
}

.featured-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.65rem;
}

.meta-dot {
  opacity: 0.5;
}

.meta-tag {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  color: rgba(165, 180, 252, 0.9);
  background: rgba(129, 140, 248, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.2);
}

.featured-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.6rem);
  font-weight: 650;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.3;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem;
}

.featured-excerpt {
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #818cf8;
  transition: color 0.2s ease;

  .cta-icon {
    font-size: 1rem;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

/* Year groups */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 120ms both;
}

.year-heading {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.year-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.35);
}

.year-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}

/* Post rows */
.post-row {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 0.75rem;
  margin: 0 -0.75rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.035);

    .row-title {
      color: #a5b4fc;
    }

    .row-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.row-date {
  flex-shrink: 0;
  width: 3.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.35);
  font-variant-numeric: tabular-nums;
}

.row-main {
  flex: 1;
  min-width: 0;
}

.row-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.45;
  margin: 0;
  transition: color 0.2s ease;
}

.row-excerpt {
  font-size: 0.8125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.35);
  margin: 0.25rem 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.row-side {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.row-tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.07);
  white-space: nowrap;
}

.row-read {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
}

.row-arrow {
  font-size: 1rem;
  color: #818cf8;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Empty state */
.empty-state {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.35);
  padding: 2rem 0;
}

/* Skeleton loading */
.skeleton-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-featured {
  aspect-ratio: 21 / 9;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
  margin-bottom: 1rem;
}

.skeleton-row {
  height: 3.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .post-row {
    flex-wrap: wrap;
    gap: 0.35rem 1rem;
  }

  .row-main {
    flex-basis: calc(100% - 4.75rem);
  }

  .row-side {
    width: 100%;
    padding-left: 4.75rem;
  }

  .row-arrow {
    display: none;
  }
}
</style>
