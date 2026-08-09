<template>
  <section class="hero" id="initial">
    <!-- Gradient mesh background -->
    <div class="hero-mesh" aria-hidden="true">
      <div class="mesh-blob mesh-blob--1"></div>
      <div class="mesh-blob mesh-blob--2"></div>
      <div class="mesh-blob mesh-blob--3"></div>
    </div>

    <div class="hero-content">
      <!-- Left: Text content -->
      <div class="hero-text">
        <NuxtLink to="/now" class="now-pill" aria-label="See what I'm up to right now">
          <span class="now-pill-dot" aria-hidden="true"></span>
          <span class="now-pill-text">What I'm up to now</span>
          <UIcon name="i-mdi-arrow-right" class="now-pill-arrow" />
        </NuxtLink>

        <div class="hero-greeting">
          Hey there, I'm
        </div>

        <h1 class="hero-name">
          Ilhan Kalač
        </h1>

        <div class="hero-tagline">
          <span class="tagline-text">{{ displayedRole }}<span class="tagline-cursor" aria-hidden="true">|</span></span>
        </div>

        <p class="hero-intro">
          I build large-scale enterprise applications with <strong>Nuxt</strong>, <strong>Vue 3</strong>
          and <strong>TypeScript</strong> — shipped across healthcare, POS and education.
          Currently full-stack at <strong>ViaLuxury</strong> in Amsterdam<span class="intro-location">,
          based in Podgorica, Montenegro</span>.
        </p>

        <dl class="hero-stats">
          <div class="stat">
            <dt class="stat-label">Experience</dt>
            <dd class="stat-value">6+ years</dd>
          </div>
          <div class="stat">
            <dt class="stat-label">Focus</dt>
            <dd class="stat-value">Frontend architecture</dd>
          </div>
          <div class="stat">
            <dt class="stat-label">Available for</dt>
            <dd class="stat-value">Remote &amp; EU hybrid</dd>
          </div>
        </dl>

        <div class="hero-cta">
          <button class="btn-primary" @click="scrollToWork">
            See My Experience
            <UIcon name="i-mdi-arrow-down" class="text-sm" />
          </button>
          <a
            class="btn-ghost"
            href="/ilhan-kalac-resume.pdf"
            download="ilhan-kalac-resume.pdf"
          >
            <UIcon name="i-mdi-tray-arrow-down" class="text-sm" />
            Download CV
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

  </section>
</template>

<script lang="ts" setup>
const roles = [
  'Full-stack Developer',
  'Nuxt & Vue 3 Specialist',
  'TypeScript Enthusiast',
]

// Seeded with the first role so SSR renders real text — no empty line on hydration.
const displayedRole = ref(roles[0]!)

let timer: ReturnType<typeof setTimeout> | undefined

const TYPE_MS = 65
const ERASE_MS = 35
const HOLD_MS = 2200

const cycleRoles = () => {
  let roleIndex = 0
  let charCount = roles[0]!.length
  let erasing = false

  const tick = () => {
    const role = roles[roleIndex]!

    if (erasing) {
      charCount--
      if (charCount === 0) {
        erasing = false
        roleIndex = (roleIndex + 1) % roles.length
      }
    }
    else {
      charCount++
      if (charCount >= role.length) {
        charCount = role.length
        erasing = true
        displayedRole.value = role
        timer = setTimeout(tick, HOLD_MS)
        return
      }
    }

    displayedRole.value = roles[roleIndex]!.slice(0, charCount)
    timer = setTimeout(tick, erasing ? ERASE_MS : TYPE_MS)
  }

  timer = setTimeout(tick, HOLD_MS)
}

onMounted(() => {
  // Respect users who asked for less motion — they keep the static first role.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  cycleRoles()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

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
  min-height: 80vh;
  width: 100%;
  overflow: hidden;
  background: rgb(var(--color-primary-rgb));
  display: flex;
  align-items: center;
  padding: var(--nav-height) 1.5rem 0;
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

/* Content layout */
.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 4rem 0;
}

/* Text side */
.hero-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 560px;
}

/* "Now" status pill */
.now-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  align-self: flex-start;
  padding: 0.3rem 0.7rem 0.3rem 0.55rem;
  margin-bottom: 0.6rem;
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

/* Greeting */
.hero-greeting {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.62);
  font-weight: 400;
  letter-spacing: 0.01em;
}

/* Name */
.hero-name {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.75rem, 6vw, 4.25rem);
  line-height: 1.05;
  font-weight: 700;
  color: #fff;
  margin: 0.1rem 0 0.35rem;
  letter-spacing: -0.035em;
}

/* Tagline */
.hero-tagline {
  /* Reserve the line so rotating roles never reflow the text below. */
  min-height: 1.9rem;
}

.tagline-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: #a5b4fc;
  letter-spacing: 0.005em;
  font-weight: 600;
}

.tagline-cursor {
  animation: cursorBlink 0.8s steps(1) infinite;
  color: #a5b4fc;
  font-weight: 300;
  margin-left: 0.05em;
}

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Intro text */
.hero-intro {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.68);
  margin: 0.4rem 0 0.25rem;
  max-width: 30rem;

  strong {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }
}

/* Credibility strip */
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
  margin: 1.1rem 0 0.35rem;
  padding: 0;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: rgba(255, 255, 255, 0.42);
}

.stat-value {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* CTA */
.hero-cta {
  display: flex;
  gap: 0.625rem;
  margin-top: 1.1rem;
}

.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.4rem;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
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
  margin-top: 0.9rem;
  margin-left: -0.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: rgba(255, 255, 255, 0.55);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.photo-frame {
  position: relative;
  width: 300px;
  height: 360px;
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

/* Reduced motion: kill the ambient loops, keep the layout identical */
@media (prefers-reduced-motion: reduce) {
  .mesh-blob {
    animation: none;
  }

  .now-pill-dot {
    animation: none;
  }

  .tagline-cursor {
    animation: none;
    opacity: 0;
  }

  .btn-primary:hover,
  .btn-ghost:hover,
  .now-pill:hover {
    transform: none;
  }
}

/* Mobile — tuned so the CTAs land above the fold on a phone. */
@media (max-width: 768px) {
  .hero {
    min-height: auto;
  }

  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    padding: 1.25rem 0 2.5rem;
    gap: 1.1rem;
  }

  .hero-text {
    align-items: center;
    max-width: 100%;
    gap: 0;
  }

  .now-pill {
    align-self: center;
    margin-bottom: 0.4rem;
  }

  .hero-greeting {
    font-size: 0.8125rem;
  }

  .hero-name {
    font-size: clamp(1.9rem, 8.5vw, 2.5rem);
    margin: 0.05rem 0 0.2rem;
  }

  .hero-tagline {
    min-height: 1.6rem;
  }

  .tagline-text {
    font-size: 1.0625rem;
  }

  .hero-intro {
    text-align: center;
    font-size: 0.875rem;
    line-height: 1.55;
    margin: 0.35rem 0 0;
    max-width: 24rem;
  }

  /* Location already sits in the About section — drop it to save a fold line. */
  .intro-location {
    display: none;
  }

  /* Labels are dropped and the values collapse into one dot-separated line —
     three stacked label/value pairs cost ~90px of fold on a phone. */
  .hero-stats {
    justify-content: center;
    gap: 0 0.5rem;
    margin: 0.7rem 0 0;
  }

  .stat {
    flex-direction: row;
    align-items: baseline;
  }

  .stat-label {
    display: none;
  }

  .stat-value {
    font-size: 0.8125rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.72);
  }

  .stat:not(:last-child)::after {
    content: '·';
    margin-left: 0.5rem;
    color: rgba(255, 255, 255, 0.3);
  }

  /* Side by side rather than stacked — two full-width buttons cost ~95px of fold. */
  .hero-cta {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 0.9rem;
    gap: 0.5rem;
  }

  .btn-primary, .btn-ghost {
    justify-content: center;
    padding: 0.6rem 1rem;
    font-size: 0.8125rem;
    /* Keep a comfortable tap target even at the reduced padding. */
    min-height: 44px;
  }

  .hero-social {
    justify-content: center;
    margin-top: 0.5rem;
    margin-left: 0;
  }

  .photo-frame {
    width: 148px;
    height: 178px;
    border-radius: 14px;
  }
}

/* Narrow phones — the two CTAs no longer fit one row at the sizes above. */
@media (max-width: 400px) {
  .btn-primary, .btn-ghost {
    padding: 0.6rem 0.7rem;
    font-size: 0.75rem;
    gap: 0.3rem;
  }

  .hero-cta {
    gap: 0.4rem;
  }

  .photo-frame {
    width: 132px;
    height: 158px;
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
    padding-top: 2rem;
  }

  .hero-name {
    font-size: 1.85rem;
  }

  .hero-cta {
    flex-direction: column;
    margin-top: 0.8rem;
  }

  .btn-primary, .btn-ghost {
    width: 100%;
    font-size: 0.8125rem;
  }
}
</style>
