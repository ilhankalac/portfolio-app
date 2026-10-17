<template>
  <section id="about" class="v2-section">
    <div class="v2-container story">
      <div class="text">
        <h2 class="v2-heading">My story</h2>
        <div class="v2-prose body" v-html="description" />

        <div class="socials">
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            :aria-label="link.label"
            target="_blank"
            rel="noopener noreferrer"
            class="social"
          >
            <UIcon :name="link.icon" />
          </a>
        </div>
      </div>

      <div class="portrait">
        <div class="ring">
          <img src="~/assets/images/landing-portrait.webp" alt="Portrait of Ilhan Kalač" loading="lazy">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ description: string }>()

const links = [
  { label: 'GitHub', icon: 'i-mdi-github', href: 'https://github.com/ilhankalac' },
  { label: 'LinkedIn', icon: 'i-mdi-linkedin', href: 'https://www.linkedin.com/in/ilhankalac/' },
  { label: 'Instagram', icon: 'i-mdi-instagram', href: 'https://www.instagram.com/vizija/' },
  { label: 'Email', icon: 'i-mdi-email-outline', href: 'mailto:ilhandeveloper@gmail.com' },
]
</script>

<style scoped lang="scss">
.story {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  align-items: center;
  gap: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.body {
  margin-top: 1.75rem;
  font-size: 1.02rem;
}

.socials {
  display: flex;
  gap: 0.6rem;
  margin-top: 2rem;
}

.social {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--v2-border-strong);
  border-radius: 50%;
  color: var(--v2-muted);
  font-size: 1.1rem;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: var(--v2-text);
    border-color: rgba(245, 239, 228, 0.35);
  }
}

.portrait {
  display: grid;
  place-items: center;

  @media (max-width: 900px) {
    order: -1;
  }
}

.ring {
  width: min(24rem, 80vw);
  aspect-ratio: 1;
  padding: 1rem;
  border-radius: 50%;
  border: 1px solid var(--v2-border-strong);
  background: radial-gradient(circle, var(--v2-surface-2), var(--v2-bg) 70%);
  box-shadow: 0 0 80px rgba(245, 239, 228, 0.05), inset 0 0 40px rgba(0, 0, 0, 0.6);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 20%;
    filter: grayscale(1) contrast(1.05);
  }
}
</style>
