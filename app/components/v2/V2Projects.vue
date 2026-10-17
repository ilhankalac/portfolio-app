<template>
  <section id="projects" class="v2-section">
    <div class="v2-container">
      <span class="v2-eyebrow">Side projects</span>
      <h2 class="v2-heading">See it in practice.</h2>

      <div class="list">
        <article v-for="project in projects" :key="project.key" class="v2-card project">
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
            <div class="shot-overlay">
              <div>
                <span class="year">{{ project.dateOfCreation }}</span>
                <h3>{{ project.title }}</h3>
              </div>
              <div class="links">
                <span v-if="project.live_demo" class="v2-pill">
                  Live demo
                  <span class="v2-pill-disc"><UIcon name="i-mdi-arrow-top-right" /></span>
                </span>
              </div>
            </div>
          </a>

          <footer class="meta">
            <div class="techs">
              <span v-for="tech in project.technologies" :key="tech.id" class="v2-chip">
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
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IFreeProject } from '~/types/models'

defineProps<{ projects: IFreeProject[] }>()

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
.list {
  display: grid;
  gap: 2rem;
  margin-top: 3.5rem;
}

.project {
  overflow: hidden;
}

.chrome {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid var(--v2-border);
}

.dots {
  display: flex;
  gap: 0.35rem;

  i {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: rgba(245, 239, 228, 0.16);
  }
}

.url {
  flex: 1;
  max-width: 22rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.4rem;
  background: var(--v2-surface-2);
  font-family: var(--v2-mono);
  font-size: 0.72rem;
  color: var(--v2-faint);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shot {
  position: relative;
  display: block;
  aspect-ratio: 16 / 8;
  overflow: hidden;
  color: inherit;
  text-decoration: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.025);
  }

  @media (max-width: 640px) {
    aspect-ratio: 4 / 3;
  }
}

.shot-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(180deg, transparent 45%, rgba(11, 11, 10, 0.92) 100%);

  h3 {
    font-family: var(--v2-display);
    font-weight: 600;
    font-size: clamp(1.4rem, 3vw, 2rem);
    letter-spacing: -0.02em;
    margin: 0.25rem 0 0;
  }

  @media (max-width: 640px) {
    padding: 1.25rem;

    .links { display: none; }
  }
}

.year {
  font-family: var(--v2-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--v2-faint);
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid var(--v2-border);
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.source {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  font-family: var(--v2-display);
  font-size: 0.85rem;
  color: var(--v2-muted);
  text-decoration: none;

  &:hover {
    color: var(--v2-text);
  }
}
</style>
