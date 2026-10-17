<template>
  <footer class="footer">
    <div class="rim" aria-hidden="true" />

    <p class="status">
      <span class="live" aria-hidden="true" />
      [ Open to remote ]
      <span class="sep">|</span>
      [ Local time <strong>{{ time || '--:--:--' }}</strong> {{ zone }} ]
    </p>

    <nav class="links" aria-label="Footer">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/#projects">Projects</NuxtLink>
      <NuxtLink to="/#about">About</NuxtLink>
      <NuxtLink to="/#experience">Experience</NuxtLink>
      <NuxtLink to="/blogs">Blog</NuxtLink>
      <NuxtLink to="/list-of-seen-films">Films</NuxtLink>
      <NuxtLink to="/favorite-quotes">Quotes</NuxtLink>
      <NuxtLink to="/favorite-songs">Songs</NuxtLink>
      <NuxtLink to="/travel">Travel</NuxtLink>
      <NuxtLink to="/#contact">Contact</NuxtLink>
    </nav>

    <p class="copy">© {{ year }} · Designed & built by Ilhan Kalač</p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const time = ref('')
const zone = ref('CET')

onMounted(() => {
  const tick = () => {
    const now = new Date()
    time.value = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Podgorica',
    }).format(now)
    zone.value = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Podgorica', timeZoneName: 'short' })
      .formatToParts(now)
      .find(part => part.type === 'timeZoneName')?.value ?? 'CET'
  }
  tick()
  const timer = setInterval(tick, 1000)
  onUnmounted(() => clearInterval(timer))
})
</script>

<style scoped lang="scss">
.footer {
  padding: 4rem var(--v2-gutter) 2.5rem;
  text-align: center;
}

.rim {
  max-width: var(--v2-max);
  height: 1px;
  margin: 0 auto 3.5rem;
  background: linear-gradient(90deg, transparent, rgb(var(--v2-ink-rgb) / 0.5), transparent);
  box-shadow: 0 0 30px rgb(var(--v2-ink-rgb) / 0.25);
}

.status {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin: 0;
  font-family: var(--v2-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--v2-faint);

  strong {
    color: var(--v2-text);
    font-weight: 500;
  }
}

.live {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--v2-live);
  box-shadow: 0 0 10px var(--v2-live);
}

.sep {
  opacity: 0.5;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1.5rem;
  margin: 2.25rem 0;

  a {
    font-family: var(--v2-display);
    font-size: 0.9rem;
    color: var(--v2-muted);
    text-decoration: none;

    &:hover {
      color: var(--v2-text);
    }
  }
}

.copy {
  margin: 0;
  font-size: 0.8rem;
  color: var(--v2-faint);
}
</style>
