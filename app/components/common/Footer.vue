<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-card">
        <div class="footer-brand">
          <button class="brand-mark" aria-label="Go to home" @click="changeTheRoute('initial')">
            IK
          </button>

          <div class="brand-copy">
            <p class="brand-kicker">Software Developer</p>
            <h2>Ilhan Kalač</h2>
            <p>
              Building focused web experiences with clean interfaces, thoughtful details,
              and code that stays pleasant to work with.
            </p>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-group">
            <h3>Navigate</h3>
            <button
              v-for="link in navigationLinks"
              :key="link.sectionId"
              class="footer-link"
              @click="changeTheRoute(link.sectionId)"
            >
              {{ link.text }}
            </button>
          </div>

          <div class="footer-group">
            <h3>Explore</h3>
            <template v-for="link in otherInterestsLinks" :key="link.text">
              <a
                v-if="link.text === 'Resume'"
                href="ilhan-kalac-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
              >
                {{ link.text }}
              </a>
              <button
                v-else
                class="footer-link"
                @click="openOtherInterestsLink(link.url)"
              >
                {{ link.text }}
              </button>
            </template>
          </div>

          <div class="footer-group footer-group--social">
            <h3>Social</h3>
            <div class="social-links">
              <button
                v-for="link in socialMediaLinks"
                :key="link.url"
                class="social-link"
                :aria-label="link.text"
                :title="link.text"
                @click="openLink(link.url)"
              >
                <UIcon :name="link.icon" />
              </button>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; {{ currentYear }} Ilhan Kalač</span>
          <span class="footer-divider"></span>
          <span>Designed and developed with care</span>
          <button class="back-to-top" @click="changeTheRoute('initial')">
            Back to top
            <UIcon name="i-mdi-arrow-up" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const router = useRouter()
const currentYear = new Date().getFullYear()

const navigationLinks = [
  { text: 'Home', sectionId: 'initial' },
  { text: 'About', sectionId: 'about' },
  { text: 'Experience', sectionId: 'experience' },
  { text: 'Free time projects', sectionId: 'freetime-projects' },
  { text: 'Recommendations', sectionId: 'recommendations' },
  { text: 'Contact', sectionId: 'get-in-touch' },
]

const otherInterestsLinks = [
  { text: 'Blog', url: '/blogs' },
  { text: 'Favorite Quotes', url: '/favorite-quotes' },
  { text: 'List of seen films', url: '/list-of-seen-films' },
  { text: 'Resume', url: 'ilhan-kalac-resume.pdf' },
]

const socialMediaLinks = [
  { text: 'LinkedIn', url: 'https://www.linkedin.com/in/ilhankalac/', icon: 'i-mdi-linkedin' },
  { text: 'GitHub', url: 'https://github.com/ilhankalac', icon: 'i-mdi-github' },
  { text: 'Twitter', url: 'https://twitter.com/privatizova', icon: 'i-mdi-twitter' },
  { text: 'Instagram', url: 'https://www.instagram.com/vizija/', icon: 'i-mdi-instagram' },
]

const changeTheRoute = (sectionId: string = '') => {
  if (sectionId === 'initial') {
    router.push({ path: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  router.push({ path: '/', hash: '#' + sectionId })
}

const openLink = (link: string) => {
  window.open(link, '_blank')
}

const openOtherInterestsLink = (path: string) => {
  if (path.includes('#')) {
    changeTheRoute(path.split('#')[1])
    return
  }
  router.push({ path })
}
</script>

<style scoped lang="scss">
.site-footer {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 0%, rgba(129, 140, 248, 0.18), transparent 34rem),
    linear-gradient(180deg, rgb(var(--color-primary-rgb)) 0%, #0b1120 100%);
  padding: 0 1.5rem 1.5rem;
}

.footer-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding-top: 1rem;
}

.footer-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.035);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.footer-brand {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
  gap: 2rem;
  padding: 2rem;
}

.brand-mark {
  align-self: start;
  width: 3rem;
  height: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(129, 140, 248, 0.12);
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.5);
    background: rgba(129, 140, 248, 0.2);
    transform: translateY(-2px);
  }
}

.brand-copy {
  justify-self: end;
  max-width: 35rem;
  text-align: right;

  h2 {
    margin: 0;
    color: rgba(255, 255, 255, 0.96);
    font-family: 'Inter', sans-serif;
    font-size: 1.35rem;
    font-weight: 650;
    line-height: 1.2;
  }

  p {
    margin: 0.65rem 0 0;
    color: rgba(255, 255, 255, 0.48);
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    line-height: 1.7;
  }

  .brand-kicker {
    margin: 0 0 0.45rem;
    color: #818cf8;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
}

.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.5rem 2rem;
}

.footer-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;

  h3 {
    margin: 0 0 0.55rem;
    color: rgba(255, 255, 255, 0.92);
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 650;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}

.footer-link {
  display: inline-flex;
  width: fit-content;
  padding: 0.15rem 0;
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  line-height: 1.6;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: translateX(3px);
  }
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  color: rgba(255, 255, 255, 0.62);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(129, 140, 248, 0.48);
    background: rgba(129, 140, 248, 0.14);
    color: rgba(255, 255, 255, 0.95);
    transform: translateY(-2px);
  }
}

.footer-bottom {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.1rem 2rem;
  color: rgba(255, 255, 255, 0.42);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
}

.footer-divider {
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 999px;
  background: rgba(129, 140, 248, 0.7);
}

.back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: auto;
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.68);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    transform: translateY(-1px);
  }
}

@media (max-width: 760px) {
  .site-footer {
    padding-inline: 1rem;
  }

  .footer-brand,
  .footer-links {
    grid-template-columns: 1fr;
    padding: 1.35rem;
  }

  .brand-copy {
    justify-self: start;
    text-align: left;
  }

  .footer-links {
    gap: 1.35rem;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
    padding: 1.1rem 1.35rem;
  }

  .footer-divider {
    display: none;
  }

  .back-to-top {
    margin-left: 0;
  }
}
</style>
