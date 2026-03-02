<template>
  <div>
    <p class="font-light text-black opacity-70">
      Collection of my thoughts and knowledge shared with the world.
    </p>
    <div v-if="status === 'pending'" class="flex flex-col gap-3 mt-4">
      <USkeleton v-for="i in 3" :key="i" class="h-48 w-full" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <div
        v-for="blog in blogs"
        :key="blog.firebaseKey"
        class="blog-card flex flex-col cursor-pointer"
        @click="openBlog(blog)"
      >
        <div class="blog-header" :style="`background-image: url(${blog.image});`">
          <div class="blog-overlay" />
        </div>
        <div class="pt-4 flex flex-col flex-1">
          <h3 class="text-black mb-3 blog-title font-light">{{ blog.title }}</h3>
          <div class="mt-auto flex justify-between items-center">
            <div class="text-black blog-author opacity-70">{{ blog.author }}</div>
            <div class="text-black blog-date">{{ blog.date }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'blog' })

const { data: blogs, status } = await useFetch<any[]>('/api/blog/posts', { default: () => [] })

const openBlog = (blog: any) => {
  const slug = blog.title.replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase()
  navigateTo(`/blogs/${slug}?key=${blog.firebaseKey}`)
}
</script>

<style scoped>
.blog-card {
  height: 100%;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.blog-card:hover {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.blog-card:hover .blog-header {
  transform: scale(1.05);
}

.blog-card:hover .blog-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}

.blog-header {
  position: relative;
  border-radius: 4px;
  height: 200px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  transition: background 0.35s ease;
}

.blog-title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3.4rem;
}

.blog-author {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.9;
}

.blog-date {
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.6;
  letter-spacing: 0.02em;
}
</style>
