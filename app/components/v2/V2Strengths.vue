<template>
  <section id="why" class="v2-section">
    <div class="v2-container">
      <span class="v2-eyebrow">What I bring</span>
      <h2 class="v2-heading">Frontend depth,<br>full-stack reach.</h2>
      <p class="v2-lede">
        Six years of shipping production applications, from the interface down to the API.
      </p>

      <div class="bento">
        <article class="v2-card tile tile--tall">
          <h3>Enterprise apps,<br>used every day.</h3>
          <p>Healthcare, POS and education platforms where performance and reliability are not optional.</p>
          <dl class="numbers">
            <div v-for="stat in stats" :key="stat.label">
              <dt>{{ stat.value }}</dt>
              <dd>{{ stat.label }}</dd>
            </div>
          </dl>
        </article>

        <article class="v2-card tile">
          <h3>Nuxt & Vue<br>at the core.</h3>
          <p>Vue 3, Nuxt and TypeScript, with architecture built for performance and accessibility.</p>
          <div class="chips">
            <span v-for="skill in topSkills" :key="skill.key" class="v2-chip">
              <UIcon :name="`i-mdi-${skill.icon}`" />
              {{ skill.name }}
            </span>
          </div>
        </article>

        <article class="v2-card tile">
          <h3>Backend<br>when it counts.</h3>
          <p>ASP.NET Core, C# and SQL, so features ship end to end instead of stopping at the API boundary.</p>
        </article>

        <article class="v2-card tile">
          <h3>Remote-first,<br>EU and Balkans.</h3>
          <p>Open to remote worldwide or hybrid in the EU and Balkans. Based in Podgorica.</p>
          <span class="clock">
            <span class="live-dot" aria-hidden="true" />
            {{ localTime }} · Podgorica
          </span>
        </article>

        <NuxtLink to="/now" class="v2-card tile tile--link">
          <h3>Right now.</h3>
          <p>{{ currentWork.short ?? currentWork.title }}</p>
          <span class="tile-more">
            What I'm up to
            <UIcon name="i-mdi-arrow-right" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { currentWork } from '~/data/now'
import type { ISkill } from '~/types/models'

const props = defineProps<{ skills: ISkill[] }>()

const stats = [
  { value: '6+', label: 'Years' },
  { value: '20+', label: 'Projects' },
  { value: '4', label: 'Companies' },
]

const topSkills = computed(() => props.skills.slice(0, 6))

const localTime = ref('')
onMounted(() => {
  const format = () => {
    localTime.value = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Podgorica',
    }).format(new Date())
  }
  format()
  const timer = setInterval(format, 30_000)
  onUnmounted(() => clearInterval(timer))
})
</script>

<style scoped lang="scss">
.bento {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 3.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.tile {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.75rem;
  min-height: 15rem;
  text-decoration: none;
  color: inherit;

  h3 {
    font-family: var(--v2-display);
    font-weight: 600;
    font-size: 1.45rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin: 0;
  }

  p {
    margin: 0;
    color: var(--v2-muted);
    line-height: 1.6;
  }

  &--tall {
    grid-row: span 2;

    @media (max-width: 600px) {
      grid-row: auto;
    }
  }

  &--link {
    transition: border-color 0.25s ease, background-color 0.25s ease;

    &:hover {
      border-color: var(--v2-border-strong);
      background: var(--v2-surface-2);
    }
  }
}

.numbers {
  display: grid;
  gap: 1.25rem;
  margin: auto 0 0;
  padding-top: 2rem;

  div {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--v2-border);
  }

  dt {
    font-family: var(--v2-display);
    font-size: 2.6rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1;
  }

  dd {
    margin: 0;
    font-family: var(--v2-mono);
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--v2-faint);
  }
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
}

.clock {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  font-family: var(--v2-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--v2-muted);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--v2-live);
  box-shadow: 0 0 10px var(--v2-live);
}

.tile-more {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  font-family: var(--v2-display);
  font-size: 0.9rem;
  color: var(--v2-text);
}
</style>
