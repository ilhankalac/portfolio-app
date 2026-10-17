<template>
  <section id="home" class="hero">
    <div class="hero-inner">
      <h1 class="title">
        Hi, I'm <span class="accent">Ilhan.</span><br>
        I build <span class="orb" aria-hidden="true" /> web apps<br>
        that scale and last.
      </h1>

      <p class="intro">
        A software engineer in Podgorica building large-scale applications with Nuxt, Vue 3,
        TypeScript and ASP.NET Core. Currently full-stack at ViaLuxury.
      </p>

      <div class="actions">
        <a class="v2-pill" href="/ilhan-kalac-resume.pdf?v=2026-10b" target="_blank" rel="noopener noreferrer">
          View my CV
          <span class="v2-pill-disc"><UIcon name="i-mdi-arrow-right" /></span>
        </a>

        <button class="email" type="button" @click="copyEmail">
          <UIcon :name="copied ? 'i-mdi-check' : 'i-mdi-content-copy'" />
          {{ copied ? 'Copied to clipboard' : email }}
        </button>
      </div>
    </div>

    <div class="horizon" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
const email = 'ilhandeveloper@gmail.com'
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.location.href = `mailto:${email}`
  }
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 7rem var(--v2-gutter) 12rem;
  text-align: center;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 56rem;
}

.title {
  font-family: var(--v2-display);
  font-weight: 600;
  font-size: clamp(2.6rem, 7.2vw, 5.4rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  margin: 0;
}

.accent {
  color: var(--v2-accent);
}

/* The small metallic sphere that sits inside the headline. */
.orb {
  display: inline-block;
  width: 0.62em;
  height: 0.62em;
  margin: 0 0.08em;
  vertical-align: 0.02em;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, var(--v2-text) 0%, #a89d8b 22%, #3d3933 58%, #121211 100%);
  box-shadow: 0 0 24px rgb(var(--v2-accent-rgb) / 0.25);
  animation: orbFloat 6s ease-in-out infinite;
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.06em); }
}

.intro {
  max-width: 36rem;
  margin: 1.75rem auto 0;
  font-size: 1.1rem;
  line-height: 1.65;
  color: var(--v2-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.25rem;
}

.email {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  font-family: var(--v2-display);
  font-size: 0.9rem;
  color: var(--v2-muted);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--v2-text);
  }
}

/* The planet rim rising from the bottom of the hero. */
.horizon {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 150vw;
  height: 150vw;
  transform: translate(-50%, 95%);
  border-radius: 50%;
  background: radial-gradient(circle at 50% 0%, var(--v2-surface-2) 0%, var(--v2-surface) 30%, var(--v2-bg) 60%);
  box-shadow:
    0 -1px 0 rgb(var(--v2-ink-rgb) / 0.45),
    0 -40px 120px rgb(var(--v2-ink-rgb) / 0.07);

  @media (max-width: 768px) {
    transform: translate(-50%, 96%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
}
</style>
