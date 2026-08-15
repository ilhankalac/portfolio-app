<template>
  <div class="stats-panel">
    <!-- Header -->
    <div class="stats-header">
      <div>
        <span class="stats-label">Cinema</span>
        <h2 class="stats-title">Watching Statistics</h2>
      </div>
      <button class="close-btn" aria-label="Close" @click="emit('close')">
        <UIcon name="i-mdi-close" />
      </button>
    </div>

    <!-- Loading -->
    <div v-if="!isStatsDataLoaded" class="stats-body">
      <div class="tile-grid">
        <div v-for="i in 4" :key="i" class="tile tile--skeleton" />
      </div>
      <div class="skeleton-list">
        <div v-for="i in 6" :key="i" class="skeleton-line" />
      </div>
    </div>

    <template v-else>
      <div class="stats-body">
        <!-- Overview tiles -->
        <div class="tile-grid">
          <div v-for="tile in tiles" :key="tile.label" class="tile">
            <span class="tile-icon">
              <UIcon :name="tile.icon" />
            </span>
            <span class="tile-value" :class="{ 'tile-value--sm': tile.compact }">{{ tile.value }}</span>
            <span class="tile-label">{{ tile.label }}</span>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tab-bar">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab"
            :class="{ 'tab--active': activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            <UIcon :name="tab.icon" class="tab-icon" />
            {{ tab.label }}
          </button>
        </div>

        <p class="tab-caption">{{ activeTabConfig?.caption }}</p>

        <!-- Ranked list -->
        <ul class="rank-list">
          <li
            v-for="(row, index) in activeRows"
            :key="`${activeTab}-${index}`"
            class="rank-row"
            :style="{ '--delay': `${index * 30}ms` }"
          >
            <span class="rank-index" :class="{ 'rank-index--top': index < 3 }">{{ index + 1 }}</span>
            <div class="rank-main">
              <span class="rank-name">{{ row.name }}</span>
              <span class="rank-track">
                <span class="rank-fill" :style="{ width: `${(row.value / activeMax) * 100}%` }" />
              </span>
            </div>
            <span class="rank-value">
              <UIcon :name="activeTabConfig?.valueIcon || ''" class="rank-value-icon" />
              {{ row.value }}
            </span>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  filmStatsData: any
  isStatsDataLoaded: boolean
}>()
const emit = defineEmits(['close'])

const tabs = [
  {
    key: 'directors',
    label: 'Directors',
    icon: 'i-mdi-movie-open-outline',
    caption: 'Count of watched films ordered by directors',
    valueIcon: 'i-mdi-eye-outline',
  },
  {
    key: 'countries',
    label: 'Countries',
    icon: 'i-mdi-earth',
    caption: 'Count of watched films ordered by countries',
    valueIcon: 'i-mdi-eye-outline',
  },
  {
    key: 'longest',
    label: 'Longest',
    icon: 'i-mdi-clock-time-four-outline',
    caption: 'Top 20 longest films I\'ve watched (minutes)',
    valueIcon: 'i-mdi-clock-time-four-outline',
  },
] as const

type TabKey = typeof tabs[number]['key']

const activeTab = ref<TabKey>('directors')
const activeTabConfig = computed(() => tabs.find(tab => tab.key === activeTab.value))

const tiles = computed(() => [
  {
    icon: 'i-mdi-movie-open-outline',
    value: props.filmStatsData?.totalFilms ?? 0,
    label: 'Total films',
    compact: false,
  },
  {
    icon: 'i-mdi-clock-time-eight-outline',
    value: props.filmStatsData?.totalWatchTime ?? '—',
    label: 'Hours watched',
    compact: true,
  },
  {
    icon: 'i-mdi-calendar-badge',
    value: props.filmStatsData?.averageFilmYear ?? '—',
    label: 'Average year',
    compact: false,
  },
  {
    icon: 'i-mdi-star-outline',
    value: props.filmStatsData?.averageRating ?? '—',
    label: 'Average rating',
    compact: false,
  },
])

const activeRows = computed<{ name: string, value: number }[]>(() => {
  const data = props.filmStatsData
  if (!data) return []

  if (activeTab.value === 'directors') {
    return (data.directorStats || []).map((d: any) => ({ name: d?.name, value: d?.count || 0 }))
  }
  if (activeTab.value === 'countries') {
    return (data.countries || []).map((c: any) => ({ name: c?.name, value: c?.count || 0 }))
  }
  return (data.longestFilm || []).map((f: any) => ({
    name: f?.title || 'Unknown Title',
    value: f?.duration || 0,
  }))
})

const activeMax = computed(() => Math.max(...activeRows.value.map(row => row.value), 1))
</script>

<style scoped lang="scss">
.stats-panel {
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  font-family: 'Inter', sans-serif;
  background: #0b1120;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1rem;
  overflow: hidden;
}

/* Header */
.stats-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.25rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.stats-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #818cf8;
  margin-bottom: 0.3rem;
}

.stats-title {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.12);
  }
}

/* Body */
.stats-body {
  padding: 1.25rem;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.16); }
}

/* Overview tiles */
.tile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 0.85rem 0.9rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(129, 140, 248, 0.25);
  }

  &--skeleton {
    height: 92px;
    animation: skeletonPulse 1.5s ease-in-out infinite;
  }
}

.tile-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  background: rgba(129, 140, 248, 0.12);
  color: #818cf8;
  font-size: 0.9rem;
}

.tile-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.95);

  &--sm {
    font-size: 1.125rem;
    padding-top: 0.2rem;
  }
}

.tile-label {
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.35);
}

/* Tabs */
.tab-bar {
  display: flex;
  gap: 0.25rem;
  margin-top: 1.5rem;
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
}

.tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.45rem 0.5rem;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }

  &--active {
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: inset 0 0 0 1px rgba(129, 140, 248, 0.2);
  }
}

.tab-icon {
  font-size: 0.9rem;
  color: #818cf8;
}

.tab-caption {
  margin: 1rem 0 0.75rem;
  font-size: 0.6875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.3);
}

/* Ranked list */
.rank-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.rank-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.6rem;
  border-radius: 0.6rem;
  transition: background 0.2s ease;
  animation: rowFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) both;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
}

.rank-index {
  flex-shrink: 0;
  width: 1.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.25);

  &--top {
    color: #818cf8;
  }
}

.rank-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.rank-name {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rank-track {
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.rank-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(129, 140, 248, 0.45), #818cf8);
  animation: barGrow 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.rank-value {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  flex-shrink: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.9);
}

.rank-value-icon {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.3);
}

/* Skeleton */
.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.skeleton-line {
  height: 0.85rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  animation: skeletonPulse 1.5s ease-in-out infinite;
}

@keyframes skeletonPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes rowFadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes barGrow {
  from { transform: scaleX(0); transform-origin: left; }
  to { transform: scaleX(1); transform-origin: left; }
}
</style>
