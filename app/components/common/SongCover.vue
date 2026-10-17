<template>
  <div class="song-cover-wrap">
    <img v-if="song.cover" :src="song.cover" :alt="`${song.title} cover art`" class="cover-img" loading="lazy" />
    <div v-else class="cover-fallback">
      <UIcon :name="fallbackIcon" class="fallback-icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Song } from '~/data/music'

defineProps<{
  song: Song
  fallbackIcon: string
}>()
</script>

<style scoped lang="scss">
.song-cover-wrap {
  border-radius: 0.6rem;
  overflow: hidden;
  background: rgb(var(--site-ink-rgb) / 0.03);
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cover-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgb(var(--site-accent-rgb) / 0.12) 0%, rgb(var(--site-accent-rgb) / 0.08) 100%);
}

.fallback-icon {
  font-size: 1.6rem;
  color: rgb(var(--site-ink-rgb) / 0.3);
}
</style>
