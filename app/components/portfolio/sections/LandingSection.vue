<template>
  <section class="hero-container" id="initial">
    <div class="parallax-bg"></div>
    <div class="overlay-gradient"></div>

    <div class="content-wrapper">
      <div class="name-container">
        <h1 class="full-name">Ilhan Kalač</h1>
        <div class="title-wrapper">
          <p class="title-text">Software Developer</p>
        </div>

        <div class="social-links mt-10">
          <button
            class="social-btn"
            @click="openLink('https://github.com/ilhankalac')"
          >
            <UIcon name="i-mdi-github" class="text-white text-2xl" />
          </button>
          <button
            class="social-btn"
            @click="openLink('https://www.linkedin.com/in/ilhankalac/')"
          >
            <UIcon name="i-mdi-linkedin" class="text-white text-2xl" />
          </button>
          <button
            class="cv-btn"
            @click="openLink('ilhan-kalac-resume.pdf')"
          >
            <UIcon name="i-mdi-file-document-outline" class="mr-1 text-white" />
            <span class="text-white">Resume</span>
          </button>
        </div>
      </div>
    </div>

    <div class="scroll-indicator-container" @click="scrollToNextSection">
      <div class="scroll-indicator">
        <span class="scroll-text">Scroll</span>
        <div class="scroll-arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const openLink = (link: string) => {
  window.open(link, '_blank', 'noopener,noreferrer')
}

const scrollToNextSection = () => {
  const section2 = document.getElementById('about')
  if (section2) {
    window.scrollTo({
      top: section2.offsetTop - window.innerHeight * 0.08,
      behavior: 'smooth',
    })
  }
}
</script>

<style scoped lang="scss">
.hero-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url("~/assets/images/landing-image.jpg");
  background-size: cover;
  background-position: center;
  transform: scale(1.1);
  animation: subtle-zoom 15s infinite alternate ease-in-out;
}

.overlay-gradient {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.content-wrapper {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  z-index: 10;
}

.name-container {
  opacity: 0;
  animation: fadeIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s forwards;
}

.full-name {
  font-family: 'Be Vietnam Pro', sans-serif;
  font-weight: 700;
  font-size: clamp(2.5rem, 8vw, 5rem);
  color: white;
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s forwards;
}

.title-wrapper { height: 40px; }

.title-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.2rem, 4vw, 2.2rem);
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.05em;
  margin: 0.5rem 0 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.6s forwards;
  position: relative;
  padding-left: 3px;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px; left: 0;
    width: 0; height: 2px;
    margin-left: 3px;
    background: linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%);
    animation: lineExpand 1s cubic-bezier(0.215, 0.61, 0.355, 1) 1.2s forwards;
  }
}

.social-links {
  display: flex;
  gap: 16px;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) 0.8s forwards;
}

.social-btn {
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); }
}

.cv-btn {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
  }
}

.scroll-indicator-container {
  position: absolute;
  bottom: 40px; left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  cursor: pointer;
  opacity: 0;
  animation: fadeIn 0.8s ease 1.5s forwards;
}

.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  &:hover { transform: translateY(-3px); }
}

.scroll-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 8px;
  font-family: 'Be Vietnam Pro', sans-serif;
}

.scroll-arrow {
  height: 30px;
  position: relative;
  width: 20px;
  span {
    position: absolute;
    top: 0; left: 50%;
    width: 10px; height: 10px;
    border-left: 2px solid rgba(255, 255, 255, 0.7);
    border-bottom: 2px solid rgba(255, 255, 255, 0.7);
    transform: rotate(-45deg) translateX(-50%);
    animation: scrollArrow 1.5s infinite;
    &:nth-child(2) { top: 8px; animation-delay: 0.2s; }
    &:nth-child(3) { top: 16px; animation-delay: 0.4s; }
  }
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lineExpand { from { width: 0; } to { width: 60px; } }
@keyframes scrollArrow { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }
@keyframes subtle-zoom { from { transform: scale(1.05); } to { transform: scale(1.15); } }

@media (max-width: 600px) {
  .social-links { justify-content: center; }
  .title-text::after { left: 50%; transform: translateX(-50%); }
  .full-name, .title-text { text-align: center; }
}
</style>
