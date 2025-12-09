<template>
  <Section
    :class="'experience-section'"
    :header="'Experience'"
    :customStyle="'min-height: auto; background: rgb(var(--v-theme-primary))'"
    :sectionId="'experience'"
  >
    <v-row v-if="!isDataLoaded" class="d-flex flex-column ga-3">
      <v-col>
        <v-skeleton-loader
          color="primary"
          class="mx-auto mb-10"
          type="heading"
          :min-width="smAndDown ? '100px' : '700px'"
        >
        </v-skeleton-loader>
        <v-skeleton-loader
          v-for="index in 5"
          color="primary"
          class="mx-auto border"
          type="list-item-three-line"
          :min-width="smAndDown ? '100px' : '700px'"
        />
      </v-col>
    </v-row>

    <!-- Minimal Cards Grid -->
    <div class="experience-grid">
      <div
        v-for="(experience, index) in experiences"
        :key="index"
        class="experience-card"
        :class="{ 'expanded': expandedId === index }"
        @click="toggleCard(index)"
      >
        <!-- Collapsed State - Minimal Info -->
        <div class="card-header">
          <div class="company-logo">
            <v-avatar
              :image="experience.logoSrc"
              :size="smAndDown ? 48 : 64"
              class="logo-avatar"
            />
          </div>

          <div class="card-info">
            <div class="company-name">{{ experience.title }}</div>
            <div class="position">{{ experience.position }}</div>
            <div class="meta">
              <span class="date">{{ experience.date }}</span>
              <span class="location">
                <v-icon size="14">mdi-map-marker</v-icon>
                {{ experience.location }}
              </span>
            </div>
          </div>

          <div class="expand-icon">
            <v-icon :class="{ 'rotated': expandedId === index }">
              mdi-chevron-down
            </v-icon>
          </div>
        </div>

        <!-- Expanded State - Projects Details -->
        <v-expand-transition>
          <div v-if="expandedId === index" class="card-content">
            <div class="description" v-html="experience.description" />

            <ExperienceCard
              :selected-item="experience"
              @close="expandedId = null"
            />
          </div>
        </v-expand-transition>
      </div>
    </div>
  </Section>
</template>

<script lang="ts" setup>
import ExperienceCard from '@/features/portfolio/components/ExperienceCard.vue'
import Section from '@/features/portfolio/components/SectionWrapper.vue'
import { onMounted, Ref, ref } from 'vue'
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
import { getVal } from '@/core/services/firebase.service'
import { IExperience } from '@/core/types/models';
import { usePageLoad } from '@/core/composables'

const experiences: Ref<IExperience[]> = ref([])
const jobDialog = ref(false)
const isDataLoaded: Ref<boolean> = ref(false)
const expandedId: Ref<number | null> = ref(null)
const { markSectionLoaded } = usePageLoad()

const getData = async () => {
  await getVal('working-experience').then((fetchedData) => {
    if (fetchedData) {
      isDataLoaded.value = true
      const key = Object.keys(fetchedData)
      experiences.value = fetchedData[key[0]].reverse()
    } else {
      // Handle the case where the fetched data is null or undefined
      console.error('Error fetching data from Firebase.')
    }
    // Mark this section as loaded after data is fetched
    markSectionLoaded('experience')
  })
}

const openCompanyLink = (link: string = '') => {
  window.open(link)
}

const calculateYearsWithDecimal = (startDate: Date = new Date('2019-10-01')): string => {
  const currentDate: Date = new Date()
  const monthsDiff: number =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    startDate.getMonth()

  const yearsWithDecimal: number = monthsDiff / 12
  return yearsWithDecimal.toFixed(2)
}

const toggleCard = (index: number) => {
  expandedId.value = expandedId.value === index ? null : index
}

onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.experience-section {
  background: rgb(var(--v-theme-primary));
  color: white;
  animation: fade linear both;
  animation-timeline: view();
  animation-range: entry 5% cover 20%;
  padding-bottom: 60px;
}

.experience-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.experience-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &.expanded {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.company-logo {
  flex-shrink: 0;

  .logo-avatar {
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    .experience-card:hover & {
      border-color: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
  }
}

.card-info {
  flex: 1;
  min-width: 0;
}

.company-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  line-height: 1.3;
}

.position {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-weight: 400;
}

.meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  flex-wrap: wrap;

  .location {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.expand-icon {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;

  .v-icon {
    transition: transform 0.3s ease;

    &.rotated {
      transform: rotate(180deg);
    }
  }

  .experience-card:hover & {
    color: rgba(255, 255, 255, 0.7);
  }
}

.card-content {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.4s ease;
}

.description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 0.95rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Mobile Responsive
@media screen and (max-width: 699px) {
  .experience-grid {
    gap: 12px;
  }

  .experience-card {
    padding: 16px;
    border-radius: 16px;
  }

  .card-header {
    gap: 12px;
  }

  .company-name {
    font-size: 1.1rem;
  }

  .position {
    font-size: 0.875rem;
  }

  .meta {
    font-size: 0.8rem;
    gap: 12px;
  }
}
</style>
