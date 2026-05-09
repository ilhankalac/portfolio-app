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
        <div class="hero-greeting">
          Hey there, I'm
        </div>

        <h1 class="hero-name">
          Ilhan Kalač
        </h1>

        <div class="hero-tagline">
          <span class="tagline-text">{{ displayedTagline }}<span class="tagline-cursor">|</span></span>
        </div>

        <p class="hero-intro">
          Building digital experiences with clean code and creative solutions. Based in Podgorica, Montenegro.
        </p>

        <div class="hero-cta">
          <button class="btn-primary" @click="scrollToWork">
            View My Work
            <UIcon name="i-mdi-arrow-down" class="text-sm" />
          </button>
          <button class="btn-ghost" @click="openLink('ilhan-kalac-resume.pdf')">
            <UIcon name="i-mdi-file-document-outline" class="text-sm" />
            Download CV
          </button>
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
            src="~/assets/images/landing-image.jpg"
            alt="Ilhan Kalač"
            class="photo-img"
          />
          <div class="photo-glow" aria-hidden="true"></div>
        </div>
      </div>
    </div>

  </section>
</template>

<script lang="ts" setup>
const displayedTagline = ref('')
const tagline = 'Software Developer'

const typeTagline = () => {
  let i = 0
  const interval = setInterval(() => {
    displayedTagline.value = tagline.slice(0, i + 1)
    i++
    if (i >= tagline.length) clearInterval(interval)
  }, 60)
}

onMounted(() => {
  typeTagline()
})

const openLink = (link: string) => {
  window.open(link, '_blank', 'noopener,noreferrer')
}

const scrollToWork = () => {
  const el = document.getElementById('experience')
  if (el) {
    window.scrollTo({ top: el.offsetTop - window.innerHeight * 0.08, behavior: 'smooth' })
  }
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 80vh;
  width: 100%;
  overflow: hidden;
  background: rgb(var(--color-primary-rgb));
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
}

/* Gradient mesh */
.hero-mesh {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
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
  gap: 0.5rem;
  max-width: 520px;
}

/* Greeting */
.hero-greeting {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 400;
  letter-spacing: 0.01em;
}

/* Name */
.hero-name {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.15;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  letter-spacing: -0.02em;
}

/* Tagline */
.tagline-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #818cf8;
  letter-spacing: 0.01em;
  font-weight: 500;
}

.tagline-cursor {
  animation: cursorBlink 0.8s steps(1) infinite;
  color: #818cf8;
  font-weight: 300;
}

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Intro text */
.hero-intro {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.45);
  margin: 0.25rem 0 0.5rem;
  max-width: 440px;
}

/* CTA */
.hero-cta {
  display: flex;
  gap: 0.625rem;
  margin-top: 0.25rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1.25rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79, 70, 229, 0.25);
  }
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1.25rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
}

/* Social */
.hero-social {
  display: flex;
  gap: 0.375rem;
  margin-top: 0.25rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.06);
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
  object-position: center top;
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


@keyframes statusPulse {
  0%, 100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.5); }
  50% { box-shadow: 0 0 14px rgba(34, 197, 94, 0.7); }
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    min-height: auto;
  }

  .hero-content {
    flex-direction: column-reverse;
    text-align: center;
    padding: 3rem 0 4rem;
    gap: 2rem;
  }

  .hero-text {
    align-items: center;
    max-width: 100%;
  }

  .hero-intro {
    text-align: center;
  }

  .hero-cta {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary, .btn-ghost {
    justify-content: center;
  }

  .hero-social {
    justify-content: center;
  }

  .photo-frame {
    width: 200px;
    height: 240px;
    border-radius: 16px;
  }
}
</style>
