<template>
  <section id="experience" class="site-section">
    <div class="site-container">
      <h2 class="site-heading">Experience</h2>

      <ol class="timeline">
        <li v-for="job in jobs" :key="job.title" class="row">
          <div class="side">
            <span class="date">{{ job.date }}</span>
            <a
              class="company"
              :href="job.company_link || undefined"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="job.logoSrc" :alt="`${job.title} logo`" class="logo" loading="lazy">
              {{ job.title }}
            </a>
            <span class="place">
              <UIcon name="i-mdi-map-marker-outline" />
              {{ job.location }}
            </span>
          </div>

          <div class="track" aria-hidden="true">
            <span class="dot" />
          </div>

          <div class="main">
            <h3>{{ job.position }}</h3>
            <div
              class="site-prose description"
              :class="{ clamped: job.long && !expanded.has(job.title) }"
              v-html="job.description"
            />
            <button v-if="job.long" type="button" class="more" @click="toggle(job.title)">
              {{ expanded.has(job.title) ? 'Show less' : 'Read more' }}
              <UIcon :name="expanded.has(job.title) ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'" />
            </button>
            <div v-if="job.techs.length" class="techs">
              <span v-for="tech in job.techs" :key="tech" class="site-chip">{{ tech }}</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IExperience } from '~/types/models'

const props = defineProps<{ experiences: IExperience[] }>()

/** Newest first, with the technologies of every project in that role, deduplicated. */
const jobs = computed(() =>
  [...props.experiences].reverse().map((job) => {
    const names = (job.projects ?? []).flatMap((project: any) =>
      (project.technologies ?? []).map((tech: any) => tech.name as string),
    )
    // Roughly five lines of text; anything longer starts collapsed.
    const long = (job.description ?? '').replace(/<[^>]+>/g, '').length > 420
    return { ...job, techs: [...new Set(names)].slice(0, 10), long }
  }),
)

const expanded = ref(new Set<string | undefined>())

const toggle = (title?: string) => {
  const next = new Set(expanded.value)
  next.has(title) ? next.delete(title) : next.add(title)
  expanded.value = next
}
</script>

<style scoped lang="scss">
.timeline {
  list-style: none;
  margin: 3.5rem 0 0;
  padding: 0;
}

.row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3rem minmax(0, 2fr);
  padding: 3rem 0;
  border-top: 1px solid var(--site-border);

  &:last-child {
    border-bottom: 1px solid var(--site-border);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 2.25rem 0;
  }
}

.side {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  align-items: flex-start;
}

.date {
  font-family: var(--site-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--site-faint);
}

.company {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--site-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--site-text);
  text-decoration: none;
}

.logo {
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.3rem;
  border-radius: 0.6rem;
  background: #fff;
  object-fit: contain;
}

.place {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--site-muted);
}

.track {
  position: relative;
  display: flex;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: -3rem;
    bottom: -3rem;
    width: 1px;
    background: var(--site-border);
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.dot {
  position: relative;
  width: 0.6rem;
  height: 0.6rem;
  margin-top: 0.5rem;
  border-radius: 50%;
  background: var(--site-text);
  box-shadow: 0 0 0 5px var(--site-bg), 0 0 0 6px var(--site-border-strong);
}

.main {
  h3 {
    font-family: var(--site-display);
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0 0 1rem;
  }
}

.description {
  font-size: 0.98rem;

  /* About five lines, fading out — works across several <p> blocks. */
  &.clamped {
    max-height: 8.5em;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(180deg, #000 55%, transparent);
    mask-image: linear-gradient(180deg, #000 55%, transparent);
  }
}

.more {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.75rem;
  padding: 0;
  background: none;
  border: none;
  font-family: var(--site-display);
  font-size: 0.88rem;
  color: var(--site-text);
  cursor: pointer;

  &:hover {
    color: var(--site-accent);
  }
}

.techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.5rem;
}
</style>
