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

            <template v-if="job.projects?.length">
              <button
                type="button"
                class="projects-toggle"
                :aria-expanded="openProjects.has(job.title)"
                @click="toggleProjects(job.title)"
              >
                <UIcon name="i-mdi-folder-outline" />
                {{ job.projects.length }} {{ job.projects.length === 1 ? 'project' : 'projects' }}
                <UIcon :name="openProjects.has(job.title) ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'" />
              </button>

              <Transition name="reveal">
                <ul v-if="openProjects.has(job.title)" class="projects">
                  <li v-for="(project, i) in job.projects" :key="project.name" class="project">
                    <div class="project-head">
                      <div>
                        <h4>{{ project.name }}</h4>
                        <span v-if="projectDates(project)" class="project-dates">{{ projectDates(project) }}</span>
                      </div>
                      <div class="project-links">
                        <a
                          v-for="link in projectLinks(project)"
                          :key="link.href"
                          :href="link.href"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <UIcon :name="link.icon" />
                          {{ link.label }}
                        </a>
                      </div>
                    </div>

                    <div
                      v-if="project.description"
                      class="site-prose project-desc"
                      :class="{ clamped: isLong(project.description) && !expanded.has(`${job.title}:${i}`) }"
                      v-html="project.description"
                    />
                    <button
                      v-if="isLong(project.description)"
                      type="button"
                      class="more"
                      @click="toggle(`${job.title}:${i}`)"
                    >
                      {{ expanded.has(`${job.title}:${i}`) ? 'Show less' : 'Read more' }}
                      <UIcon :name="expanded.has(`${job.title}:${i}`) ? 'i-mdi-chevron-up' : 'i-mdi-chevron-down'" />
                    </button>

                    <div v-if="project.technologies?.length" class="techs techs--small">
                      <span v-for="tech in project.technologies" :key="tech.id" class="site-chip">{{ tech.name }}</span>
                    </div>
                  </li>
                </ul>
              </Transition>
            </template>
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
    const long = isLong(job.description)
    return { ...job, techs: [...new Set(names)].slice(0, 10), long }
  }),
)

/** Roughly five lines of text; anything longer starts collapsed. */
function isLong(html?: string) {
  return (html ?? '').replace(/<[^>]+>/g, '').length > 420
}

const expanded = ref(new Set<string | undefined>())
const openProjects = ref(new Set<string | undefined>())

const toggleProjects = (title?: string) => {
  const next = new Set(openProjects.value)
  next.has(title) ? next.delete(title) : next.add(title)
  openProjects.value = next
}

const projectDates = (project: any) =>
  [project.startDate, project.endDate].filter(Boolean).join(' – ')

/** A GitHub URL in project_link is shown as code, anything else as the live site. */
const projectLinks = (project: any) => {
  const links: { href: string, label: string, icon: string }[] = []
  for (const href of [project.project_link, project.code_link]) {
    if (!href || links.some(link => link.href === href)) continue
    const isCode = /github\.com|gitlab\.com/.test(href)
    links.push({ href, label: isCode ? 'Code' : 'Live', icon: isCode ? 'i-mdi-github' : 'i-mdi-open-in-new' })
  }
  return links
}

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

/* Projects at each company */
.projects-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.25rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--site-border-strong);
  border-radius: 9999px;
  background: none;
  font-family: var(--site-display);
  font-size: 0.85rem;
  color: var(--site-text);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: rgb(var(--site-ink-rgb) / 0.32);
    background: var(--site-surface);
  }
}

.projects {
  list-style: none;
  display: grid;
  gap: 0.75rem;
  margin: 1rem 0 0;
  padding: 0;
}

.project {
  padding: 1.1rem 1.25rem;
  border: 1px solid var(--site-border);
  border-radius: 1rem;
  background: var(--site-surface);
}

.project-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;

  h4 {
    margin: 0;
    font-family: var(--site-display);
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
}

.project-dates {
  display: block;
  margin-top: 0.25rem;
  font-family: var(--site-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--site-faint);
}

.project-links {
  display: flex;
  flex-shrink: 0;
  gap: 0.75rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--site-display);
    font-size: 0.82rem;
    color: var(--site-muted);
    text-decoration: none;

    &:hover {
      color: var(--site-text);
    }
  }
}

.project-desc {
  font-size: 0.92rem;

  /* Indented lines from the CMS editor. */
  :deep(.ql-indent-1) {
    margin-left: 1rem;
  }

  &.clamped {
    max-height: 8.5em;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(180deg, #000 55%, transparent);
    mask-image: linear-gradient(180deg, #000 55%, transparent);
  }
}

.techs--small {
  margin-top: 1rem;

  .site-chip {
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
  }
}

.reveal-enter-active,
.reveal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.reveal-enter-from,
.reveal-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
