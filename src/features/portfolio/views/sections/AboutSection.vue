<template>
  <section class="about-section-modern" id="about">
    <div class="section-container">
      <!-- Header with animated title -->
      <div class="section-header">
        <div class="header-content">
          <span class="section-label">Who am I</span>
          <h2 class="section-title">About Me</h2>
          <div class="title-accent"></div>
        </div>
      </div>

      <!-- Main content grid -->
      <div class="content-grid">
        <!-- Profile Card -->
        <div class="profile-card glass-card">
          <div class="profile-image-wrapper">
            <div class="image-glow"></div>
            <v-avatar size="120" class="profile-avatar">
              <v-img alt="Profile" src="@/assets/profile_photo.jpg" />
            </v-avatar>
          </div>
          
          <div class="profile-info">
            <h3 class="profile-name">Ilhan Kalač</h3>
            <p class="profile-role">Software Developer</p>
          </div>

          <!-- Contact Info -->
          <div class="contact-list">
            <a href="https://www.google.com/mapsa/place/Podgorica" 
               target="_blank" 
               class="contact-item">
              <v-icon size="20">mdi-map-marker</v-icon>
              <span>Podgorica, Montenegro</span>
            </a>
            <a href="mailto:ilhandeveloper@gmail.com" class="contact-item">
              <v-icon size="20">mdi-email</v-icon>
              <span>ilhandeveloper@gmail.com</span>
            </a>
            <a href="tel:+38268186196" class="contact-item">
              <v-icon size="20">mdi-phone</v-icon>
              <span>+382 68 186 196</span>
            </a>
          </div>

          <!-- Social Links -->
          <div class="social-links">
            <a href="https://github.com/ilhankalac" 
               target="_blank" 
               class="social-link">
              <v-icon>mdi-github</v-icon>
            </a>
            <a href="https://www.linkedin.com/in/ilhankalac/" 
               target="_blank" 
               class="social-link">
              <v-icon>mdi-linkedin</v-icon>
            </a>
            <a href="https://www.instagram.com/vizija/" 
               target="_blank" 
               class="social-link">
              <v-icon>mdi-instagram</v-icon>
            </a>
          </div>

          <!-- Divider -->
          <div class="section-divider"></div>

          <!-- Explore More Section -->
          <div class="explore-section">
            <h4 class="explore-title">Explore More</h4>
            <div class="links-grid">
              <div @click="router.push({ path: 'blogs/list' })" class="link-item">
                <div class="link-icon">
                  <v-icon size="20">mdi-post</v-icon>
                </div>
                <div class="link-content">
                  <span class="link-title">Blog Posts</span>
                  <span class="link-subtitle">My thoughts</span>
                </div>
              </div>
              <div @click="router.push({ path: 'favorite-quotes' })" class="link-item">
                <div class="link-icon">
                  <v-icon size="20">mdi-format-quote-close</v-icon>
                </div>
                <div class="link-content">
                  <span class="link-title">Quotes</span>
                  <span class="link-subtitle">Inspiration</span>
                </div>
              </div>
              <div @click="router.push({ path: 'list-of-seen-films' })" class="link-item">
                <div class="link-icon">
                  <v-icon size="20">mdi-filmstrip</v-icon>
                </div>
                <div class="link-content">
                  <span class="link-title">Films</span>
                  <span class="link-subtitle">My collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Card -->
        <div class="description-card glass-card">
          <div v-if="aboutDescription" v-html="aboutDescription" class="description-content" />
          <div v-else class="loading-state">
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'
import { usePageLoad } from '@/core/composables'
import { getVal } from '@/core/services/firebase.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const aboutDescription: Ref<string> = ref('')
const { markSectionLoaded } = usePageLoad()

onMounted(() => {
  getVal('about').then((val) => {
    if (val) {
      aboutDescription.value = val
    }
    markSectionLoaded('about')
  })
})
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

.about-section-modern {
  min-height: 65vh;
  background: linear-gradient(180deg, 
    rgb(var(--v-theme-primary)) 0%, 
    rgba(var(--v-theme-primary), 0.95) 100%
  );
  padding: 0.7rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Header Styling */
.section-header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease;
}

.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: white;
  margin: 0.25rem 0;
  line-height: 1.2;
}

.title-accent {
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(255, 255, 255, 0.2) 100%
  );
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 1.5rem;
  animation: fadeInUp 0.8s ease 0.2s both;
  align-items: stretch;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: start;
  }
}

/* Glass Card Effect */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
}

/* Profile Card */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: space-between;
}

.profile-image-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

.profile-avatar {
  position: relative;
  z-index: 1;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.profile-info {
  margin-bottom: 1rem;
}

.profile-name {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.25rem 0;
}

.profile-role {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 500;
}

/* Contact List */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateX(4px);
  }
  
  span {
    flex: 1;
    text-align: left;
  }
}

/* Social Links */
.social-links {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px) scale(1.05);
  }
}

/* Section Divider */
.section-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    transparent 100%
  );
  margin: 1rem 0;
}

/* Explore More Section inside Profile Card */
.explore-section {
  width: 100%;
}

.explore-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: white;
  margin: 0 0 0.75rem 0;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
    
    .link-icon {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }
  }
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.link-content {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  text-align: left;
  flex: 1;
}

.link-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  text-align: left;
}

.link-subtitle {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.2;
  text-align: left;
}

/* Description Card */
.description-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.description-content {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.7;
  font-family: 'Inter', sans-serif;
  
  :deep(p) {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    // Empty paragraphs create spacing
    &:empty {
      min-height: 0.5rem;
      margin: 0.5rem 0;
    }
  }
  
  :deep(strong) {
    color: white;
    font-weight: 600;
  }
  
  :deep(a) {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    transition: all 0.3s ease;
    
    &:hover {
      color: white;
      text-decoration-color: white;
    }
  }
}

/* Loading State */
.loading-state {
  .skeleton-line {
    height: 16px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    margin-bottom: 12px;
    animation: pulse 1.5s ease-in-out infinite;
    
    &.short {
      width: 70%;
    }
  }
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1.1);
  }
}
</style>