<template>
  <section class="hero" id="initial">
    <!-- Gradient mesh background -->
    <div class="hero-mesh" aria-hidden="true">
      <div class="mesh-blob mesh-blob--1"></div>
      <div class="mesh-blob mesh-blob--2"></div>
      <div class="mesh-blob mesh-blob--3"></div>
    </div>

    <div class="hero-inner">
      <div class="hero-content">
        <!-- Left: Text content -->
        <div class="hero-text">
          <NuxtLink to="/now" class="now-pill" aria-label="See what I'm up to right now">
            <span class="now-pill-dot" aria-hidden="true"></span>
            <span class="now-pill-text">What I'm up to now</span>
            <UIcon name="i-mdi-arrow-right" class="now-pill-arrow" />
          </NuxtLink>

          <h1 class="hero-name">
            Ilhan Kalač
          </h1>

          <p class="hero-tagline">
            Software engineer. Film obsessive. Occasional writer.
          </p>

          <p class="hero-intro">
            I build large-scale applications with <strong>Nuxt</strong>, <strong>Vue 3</strong>
            and <strong>TypeScript</strong> — shipped across healthcare, POS and education.
            <br class="intro-break" />
            Currently full-stack at <strong>ViaLuxury</strong> — redefining luxury travel.
          </p>

          <div class="hero-cta">
            <button class="btn-primary" @click="scrollToWork">
              View Work
              <UIcon name="i-mdi-arrow-right" class="btn-icon" />
            </button>
            <a
              class="btn-ghost"
              href="/ilhan-kalac-resume.pdf"
              download="ilhan-kalac-resume.pdf"
            >
              Download CV
              <UIcon name="i-mdi-tray-arrow-down" class="btn-icon" />
            </a>
          </div>

          <div class="hero-social">
            <a href="https://github.com/ilhankalac" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub">
              <UIcon name="i-mdi-github" />
            </a>
            <a href="https://www.linkedin.com/in/ilhankalac/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="LinkedIn">
              <UIcon name="i-mdi-linkedin" />
            </a>
            <a href="https://www.instagram.com/vizija/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
              <UIcon name="i-mdi-instagram" />
            </a>
          </div>
        </div>

        <!-- Right: Photo -->
        <div class="hero-photo">
          <div class="photo-frame">
            <img
              src="~/assets/images/landing-portrait.webp"
              alt="Portrait of Ilhan Kalač"
              class="photo-img"
              width="800"
              height="1000"
              fetchpriority="high"
              decoding="async"
            />
            <div class="photo-glow" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <!-- NOW strip -->
      <NuxtLink to="/now" class="now-strip" aria-label="See what I'm up to right now">
        <span class="now-strip-label">
          Now
          <span class="now-strip-dot" aria-hidden="true"></span>
        </span>

        <div class="now-strip-grid">
          <div v-for="column in nowColumns" :key="column.label" class="now-col">
            <span class="now-col-head">
              <UIcon :name="column.icon" class="now-col-icon" />
              {{ column.label }}
            </span>
            <span class="now-col-text">{{ column.text }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { currentWork, reading, thinkingAbout } from '~/data/now'
import type { IWatchedFilm } from '~/types/models'

const props = defineProps<{
  /** Most recently watched films, newest first. Empty until the API resolves. */
  watching?: IWatchedFilm[]
}>()

/** Joins a list into "A, B and C" so each column reads as a sentence. */
const toSentence = (parts: string[]): string => {
  if (parts.length <= 1) return parts[0] ?? ''
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

const readingText = computed(() => {
  if (!reading.length) return 'Between books at the moment.'
  return toSentence(reading.map(book => `${book.title} by ${book.author}`)) + '.'
})

const watchingText = computed(() => {
  const films = props.watching ?? []
  // Falls back to the Films page pitch if the build-time fetch returned nothing.
  if (!films.length) return 'Working through the MUBI backlog.'
  return toSentence(films.map(film => film.title)) + '.'
})

const nowColumns = computed(() => [
  { label: 'Working', icon: 'i-mdi-laptop', text: currentWork.short ?? currentWork.title },
  { label: 'Reading', icon: 'i-mdi-book-open-page-variant-outline', text: readingText.value },
  { label: 'Watching', icon: 'i-mdi-movie-open-outline', text: watchingText.value },
  { label: 'Thinking about', icon: 'i-mdi-palette-outline', text: thinkingAbout },
])

const scrollToWork = () => {
  const el = document.getElementById('experience')
  if (!el) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({
    top: el.offsetTop - window.innerHeight * 0.08,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
}
</script>

<style scoped lang="scss">
.hero {
  /* Height of the fixed .nav (measured ~58px) — hero content must clear it. */
  --nav-height: 3.75rem;

  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: rgb(var(--color-primary-rgb));
  display: flex;
  align-items: center;
  padding: var(--nav-height) 1.5rem 2rem;
}

/* Gradient mesh */
.hero-mesh {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  /* Promote to its own layer so the 80px blur rasterises once instead of
     repainting on every animation frame. */
  will-change: transform;
  animation: meshFloat 20s ease-in-out infinite;

  &--1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #4f46e5 0%, transparent 70%);
    top: 10%;
    right: 15%;
    animation-delay: 0s;
  }

  &--2 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
    bottom: 10%;
    right: 30%;
    animation-delay: -7s;
  }

  &--3 {
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #2563eb 0%, transparent 70%);
    top: 30%;
    left: 5%;
    animation-delay: -14s;
  }
}

@keyframes meshFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -20px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(10px, 30px) scale(1.02); }
}

/* Layout */
.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  width: 100%;
}

/* Text side */
.hero-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 620px;
}

/* "Now" status pill */
.now-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem 0.3rem 0.55rem;
  margin-bottom: 1.1rem;
  background: rgba(129, 140, 248, 0.08);
  border: 1px solid rgba(129, 140, 248, 0.18);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    background: rgba(129, 140, 248, 0.14);
    border-color: rgba(129, 140, 248, 0.35);
    color: rgba(255, 255, 255, 0.95);
    transform: translateY(-1px);
  }

  &:hover .now-pill-arrow {
    transform: translateX(2px);
  }
}

.now-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
  animation: nowPulse 2s ease-out infinite;
}

@keyframes nowPulse {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6); }
  70% { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
}

.now-pill-arrow {
  font-size: 0.75rem;
  opacity: 0.6;
  transition: transform 0.25s ease;
}

/* Name — the display serif carries the whole redesign */
.hero-name {
  font-family: 'Playfair Display', 'Newsreader', Georgia, serif;
  font-size: clamp(3rem, 8vw, 5.75rem);
  line-height: 1;
  font-weight: 500;
  color: #fff;
  margin: 0;
  letter-spacing: -0.02em;
}

/* Tagline */
.hero-tagline {
  font-family: 'Playfair Display', 'Newsreader', Georgia, serif;
  font-size: clamp(1.15rem, 2.2vw, 1.6rem);
  font-weight: 400;
  color: #a5b4fc;
  letter-spacing: -0.005em;
  margin: 1rem 0 0;
}

/* Intro text */
.hero-intro {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.62);
  margin: 1.15rem 0 0;
  max-width: 34rem;

  strong {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }
}

/* CTA */
.hero-cta {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.9rem;
}

.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease,
              color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  &:focus-visible {
    outline: 2px solid #a5b4fc;
    outline-offset: 3px;
  }

  &:hover .btn-icon {
    transform: translateX(2px);
  }
}

.btn-icon {
  font-size: 0.9rem;
  transition: transform 0.25s ease;
}

.btn-primary {
  background: #4f46e5;
  color: #fff;
  border: 1px solid #4f46e5;

  &:hover {
    background: #4338ca;
    border-color: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
  }
}

.btn-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.18);

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.35);
    color: #fff;
    transform: translateY(-2px);
  }
}

/* Social */
.hero-social {
  display: flex;
  gap: 0.25rem;
  margin-top: 1.1rem;
  margin-left: -0.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: rgba(255, 255, 255, 0.45);
  border-radius: 8px;
  font-size: 1.15rem;
  transition: color 0.25s ease, background-color 0.25s ease;
  text-decoration: none;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid #a5b4fc;
    outline-offset: 2px;
  }
}

/* Photo side */
.hero-photo {
  flex-shrink: 0;
}

.photo-frame {
  position: relative;
  width: 340px;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.03);
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Keeps the face in the upper third of the frame instead of dead centre. */
  object-position: center 22%;
  display: block;
}

.photo-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(79, 70, 229, 0.12) 100%
  );
  pointer-events: none;
}

/* NOW strip */
.now-strip {
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  padding: 1.6rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.02);
  text-decoration: none;
  transition: border-color 0.25s ease, background-color 0.25s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.28);
    background: rgba(255, 255, 255, 0.035);
  }

  &:focus-visible {
    outline: 2px solid #a5b4fc;
    outline-offset: 3px;
  }
}

.now-strip-label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
  padding-top: 0.1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: rgba(255, 255, 255, 0.8);
}

.now-strip-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #818cf8;
}

.now-strip-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0 2rem;
  flex: 1;
}

.now-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1.75rem;
  border-left: 1px solid rgba(255, 255, 255, 0.07);

  &:first-child {
    padding-left: 0;
    border-left: none;
  }
}

.now-col-head {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
}

.now-col-icon {
  font-size: 1rem;
  color: #818cf8;
}

.now-col-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.48);
}

/* Reduced motion: kill the ambient loops, keep the layout identical */
@media (prefers-reduced-motion: reduce) {
  .mesh-blob,
  .now-pill-dot {
    animation: none;
  }

  .btn-primary:hover,
  .btn-ghost:hover,
  .now-pill:hover {
    transform: none;
  }
}

/* Tablet — the four NOW columns stop fitting on one row well before the
   layout itself breaks, so they fold to a 2×2 grid first. */
@media (max-width: 1024px) {
  .now-strip {
    flex-direction: column;
    gap: 1.35rem;
    padding: 1.4rem 1.5rem;
  }

  .now-strip-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.35rem 1.75rem;
    width: 100%;
  }

  .now-col:nth-child(odd) {
    padding-left: 0;
    border-left: none;
  }

  .photo-frame {
    width: 270px;
    height: 340px;
  }
}

/* Mobile — tuned so the CTAs land above the fold on a phone. */
@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding-bottom: 3rem;
  }

  .hero-inner {
    gap: 2rem;
  }

  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 1.25rem;
  }

  .hero-text {
    align-items: center;
    max-width: 100%;
  }

  .now-pill {
    margin-bottom: 0.75rem;
  }

  .hero-name {
    font-size: clamp(2.5rem, 12vw, 3.4rem);
  }

  .hero-tagline {
    font-size: 1.05rem;
    margin-top: 0.7rem;
  }

  .hero-intro {
    font-size: 0.875rem;
    line-height: 1.6;
    margin-top: 0.85rem;
    max-width: 26rem;
  }

  /* One flowing paragraph reads better than two short centred lines. */
  .intro-break {
    display: none;
  }

  .hero-cta {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 1.4rem;
    gap: 0.5rem;
  }

  .btn-primary, .btn-ghost {
    justify-content: center;
    padding: 0.65rem 1.15rem;
    font-size: 0.8125rem;
    /* Keep a comfortable tap target even at the reduced padding. */
    min-height: 44px;
  }

  .hero-social {
    justify-content: center;
    margin-top: 0.7rem;
    margin-left: 0;
  }

  .photo-frame {
    width: 168px;
    height: 205px;
    border-radius: 14px;
  }

  /* Single column — 2×2 leaves the text columns too narrow to read. */
  .now-strip {
    text-align: left;
    gap: 1.1rem;
    padding: 1.25rem 1.25rem;
  }

  .now-strip-grid {
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .now-col {
    padding-left: 0;
    border-left: none;
    gap: 0.3rem;
  }
}

/* Narrow phones — the two CTAs no longer fit one row at the sizes above. */
@media (max-width: 400px) {
  .btn-primary, .btn-ghost {
    padding: 0.6rem 0.8rem;
    font-size: 0.75rem;
    gap: 0.3rem;
  }

  .hero-cta {
    gap: 0.4rem;
  }

  .photo-frame {
    width: 140px;
    height: 172px;
  }

  .hero-intro {
    font-size: 0.8125rem;
  }
}

/* Very narrow legacy phones (≤340px). Even at 104px the portrait is too small
   to read as a portrait, so it yields the fold to the pitch and the CTAs. */
@media (max-width: 340px) {
  .hero-photo {
    display: none;
  }

  .hero-content {
    gap: 0;
  }

  .hero-name {
    font-size: 2.2rem;
  }

  .hero-cta {
    flex-direction: column;
  }

  .btn-primary, .btn-ghost {
    width: 100%;
    font-size: 0.8125rem;
  }
}
</style>
