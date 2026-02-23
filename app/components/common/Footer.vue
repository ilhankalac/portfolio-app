<template>
  <div class="bg-slate-900">
    <section class="max-w-5xl mx-auto px-6 py-12">
      <footer>
        <div class="flex flex-col md:flex-row md:justify-between gap-8">
          <div class="footer-section">
            <div class="footer-heading text-white text-xs uppercase tracking-wider font-light mb-4 relative inline-block after:content-[''] after:absolute after:right-[10%] after:bottom-[-2px] after:w-[60%] after:h-px after:bg-gray-200 after:translate-x-[-50%]">
              Useful Links
            </div>
            <div class="flex flex-col md:flex-col flex-wrap gap-2">
              <span
                v-for="link in navigationLinks"
                :key="link.sectionId"
                class="text-gray-400 text-sm cursor-pointer hover:text-gray-300 hover:underline"
                @click="changeTheRoute(link.sectionId)"
              >
                {{ link.text }}
              </span>
            </div>
          </div>
          <div class="footer-section">
            <div class="footer-heading text-white text-xs uppercase tracking-wider font-light mb-4 relative inline-block after:content-[''] after:absolute after:right-[10%] after:bottom-[-2px] after:w-[60%] after:h-px after:bg-gray-200 after:translate-x-[-50%]">
              Explore my work
            </div>
            <div class="flex flex-col md:flex-col gap-2">
              <template v-for="link in otherInterestsLinks" :key="link.text">
                <a
                  v-if="link.text === 'Resume'"
                  href="ilhan-kalac-resume.pdf"
                  target="_blank"
                  class="text-gray-400 text-sm cursor-pointer hover:text-gray-300 hover:underline no-underline"
                >
                  Resume
                </a>
                <span
                  v-else
                  class="text-gray-400 text-sm cursor-pointer hover:text-gray-300 hover:underline"
                  @click="openOtherInterestsLink(link.url)"
                >
                  {{ link.text }}
                </span>
              </template>
            </div>
          </div>
          <div class="footer-section">
            <div class="footer-heading text-white text-xs uppercase tracking-wider font-light mb-4 relative inline-block after:content-[''] after:absolute after:right-[10%] after:bottom-[-2px] after:w-[60%] after:h-px after:bg-gray-200 after:translate-x-[-50%]">
              Social Media
            </div>
            <div class="flex flex-col md:flex-col gap-2">
              <span
                v-for="link in socialMediaLinks"
                :key="link.url"
                class="text-gray-400 text-sm cursor-pointer hover:text-gray-300 hover:underline"
                @click="openLink(link.url)"
              >
                {{ link.text }}
              </span>
            </div>
          </div>
        </div>
        <div class="pt-8 text-center text-white text-sm">
          <span>&copy; {{ new Date().getFullYear() }}</span>
          <span> • </span>
          <span>Designed and developed by me</span>
        </div>
      </footer>
    </section>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const navigationLinks = [
  { text: 'Home', sectionId: 'initial' },
  { text: 'About', sectionId: 'about' },
  { text: 'Experience', sectionId: 'experience' },
  { text: 'Free time projects', sectionId: 'freetime-projects' },
  { text: 'Skills', sectionId: 'explore' },
  { text: 'Recommendations', sectionId: 'recommendations' },
]

const otherInterestsLinks = [
  { text: 'Blog', url: 'blogs/list' },
  { text: 'Favorite Quotes', url: 'favorite-quotes' },
  { text: 'List of seen films', url: 'list-of-seen-films' },
  { text: 'Resume', url: 'ilhan-kalac-resume.pdf' },
]

const socialMediaLinks = [
  { text: 'LinkedIn', url: 'https://www.linkedin.com/in/ilhankalac/' },
  { text: 'GitHub', url: 'https://github.com/ilhankalac' },
  { text: 'Twitter', url: 'https://twitter.com/privatizova' },
  { text: 'Instagram', url: 'https://www.instagram.com/vizija/' },
]

const changeTheRoute = (sectionId: string = '') => {
  if (sectionId === 'initial') {
    router.push({ path: '/' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  router.push({ hash: '#' + sectionId })
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
