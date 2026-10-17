<template>
  <section id="projects" class="site-section">
    <div class="site-container">
      <span class="site-eyebrow">Side projects</span>
      <h2 class="site-heading">See it in practice.</h2>

      <div class="grid">
        <article v-for="project in projects" :key="project.key" class="site-card project">
          <div class="chrome">
            <span class="dots" aria-hidden="true"><i /><i /><i /></span>
            <span class="url">{{ hostname(project.live_demo) || project.title }}</span>
          </div>

          <a
            class="shot"
            :href="project.live_demo || project.source_code"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Open ${project.title}`"
          >
            <img :src="project.image" :alt="project.title" loading="lazy">
            <span v-if="project.live_demo" class="shot-cta">
              <span class="site-pill">
                Live demo
                <span class="site-pill-disc"><UIcon name="i-mdi-arrow-top-right" /></span>
              </span>
            </span>
          </a>

          <div class="body">
            <span class="year">{{ project.dateOfCreation }}</span>
            <h3>{{ project.title }}</h3>

            <div class="site-prose description clamped" v-html="project.description" />
            <button type="button" class="more" @click="open(project)">
              Read more
              <UIcon name="i-mdi-arrow-right" />
            </button>

            <!-- Pinned to the bottom so every card in a row ends on the same line. -->
            <footer class="foot">
              <div class="techs">
                <span v-for="tech in project.technologies" :key="tech.id" class="site-chip">
                  {{ tech.name }}
                </span>
              </div>

              <a
                v-if="project.source_code"
                class="source"
                :href="project.source_code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UIcon name="i-mdi-github" />
                Source
              </a>
            </footer>
          </div>
        </article>
      </div>
    </div>

    <UModal
      v-model:open="modalOpen"
      :ui="{
        overlay: 'bg-black/70 backdrop-blur-sm',
        content: 'bg-transparent ring-0 shadow-none divide-y-0 sm:max-w-2xl',
      }"
    >
      <template #content>
        <article v-if="selected" class="site-card detail">
          <button type="button" class="close" aria-label="Close" @click="modalOpen = false">
            <UIcon name="i-mdi-close" />
          </button>

          <img :src="selected.image" :alt="selected.title" class="detail-shot">

          <div class="detail-body">
            <span class="year">{{ selected.dateOfCreation }}</span>
            <h3>{{ selected.title }}</h3>
            <div class="site-prose description" v-html="selected.description" />

            <div class="techs">
              <span v-for="tech in selected.technologies" :key="tech.id" class="site-chip">
                {{ tech.name }}
              </span>
            </div>

            <div class="detail-actions">
              <a
                v-if="selected.live_demo"
                class="site-pill"
                :href="selected.live_demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
                <span class="site-pill-disc"><UIcon name="i-mdi-arrow-top-right" /></span>
              </a>
              <a
                v-if="selected.source_code"
                class="source"
                :href="selected.source_code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <UIcon name="i-mdi-github" />
                Source code
              </a>
            </div>
          </div>
        </article>
      </template>
    </UModal>
  </section>
</template>

<script setup lang="ts">
import type { IFreeProject } from '~/types/models'

defineProps<{ projects: IFreeProject[] }>()

const modalOpen = ref(false)
const selected = ref<IFreeProject | null>(null)

const open = (project: IFreeProject) => {
  selected.value = project
  modalOpen.value = true
}

const hostname = (url?: string) => {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 3.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.project {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 0.25s ease;

  &:hover {
    border-color: var(--site-border-strong);
  }
}

.chrome {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.8rem;
  border-bottom: 1px solid var(--site-border);
}

.dots {
  display: flex;
  gap: 0.3rem;

  i {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: rgb(var(--site-ink-rgb) / 0.16);
  }
}

.url {
  flex: 1;
  min-width: 0;
  padding: 0.2rem 0.6rem;
  border-radius: 0.35rem;
  background: var(--site-surface-2);
  font-family: var(--site-mono);
  font-size: 0.66rem;
  color: var(--site-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shot {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.04);
  }

  &:hover .shot-cta,
  &:focus-visible .shot-cta {
    opacity: 1;
  }
}

/* Revealed on hover; touch devices go straight to the link on tap. */
.shot-cta {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(var(--site-bg-rgb) / 0.55);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  padding: 1.1rem 1.2rem 1.25rem;

  h3 {
    font-family: var(--site-display);
    font-weight: 600;
    font-size: 1.15rem;
    line-height: 1.25;
    letter-spacing: -0.015em;
    margin: 0;
    /* Always two lines tall, so descriptions start at the same height. */
    min-height: 2.5em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.foot {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.description {
  font-size: 0.9rem;
  line-height: 1.6;

  /* CMS descriptions carry inline `color: white` on links. */
  :deep(a) {
    color: var(--site-accent) !important;
  }

  /* About four lines, fading out — works across several <p> blocks. */
  &.clamped {
    height: 6.4em;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(180deg, #000 50%, transparent);
    mask-image: linear-gradient(180deg, #000 50%, transparent);
  }
}

.more {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  align-self: flex-start;
  padding: 0;
  background: none;
  border: none;
  font-family: var(--site-display);
  font-size: 0.82rem;
  color: var(--site-text);
  cursor: pointer;

  &:hover {
    color: var(--site-accent);
  }
}

.year {
  font-family: var(--site-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--site-faint);
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.25rem;

  .site-chip {
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
  }
}

.source {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--site-display);
  font-size: 0.82rem;
  color: var(--site-muted);
  text-decoration: none;
  align-self: flex-start;

  &:hover {
    color: var(--site-text);
  }
}

/* Project modal */
.detail {
  position: relative;
  max-height: 88vh;
  overflow-y: auto;
  background: var(--site-surface);
  color: var(--site-text);
}

.close {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--site-border-strong);
  border-radius: 50%;
  background: rgb(var(--site-bg-rgb) / 0.7);
  color: var(--site-text);
  cursor: pointer;
}

.detail-shot {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top;
  border-bottom: 1px solid var(--site-border);
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.75rem;

  h3 {
    font-family: var(--site-display);
    font-weight: 600;
    font-size: 1.6rem;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .description {
    font-size: 0.98rem;
  }
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  margin-top: 0.5rem;
}
</style>
