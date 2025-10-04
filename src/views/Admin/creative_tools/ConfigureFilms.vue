<template>
  <v-container>
    <div style="position: absolute; right: 0" class="mr-6">
      <v-btn variant="outlined">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div>
      <v-btn 
        @click="generateStats"
        variant="outlined"
      > Generate stats 
    </v-btn>

    <v-btn
      variant="outlined"
      @click="extractFilmData()"
    >
      Export films data
    </v-btn>
    </div>
    <v-row class="mt-6">
      <v-col v-if="!isDataLoaded" class="d-flex flex-column ga-3">
        <v-skeleton-loader v-for="index in 5" color="primary" type="article" />
      </v-col>

      <v-col
        class="pa-0 my-2"
        cols="12"
        v-for="(film, key) in films"
        :key="key"
      >
        <v-card
          color="primary"
          class="pa-4 d-flex flex-column justify-space-between"
          :style="`min-height: 200px; background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${film?.still_url}); background-size: cover; background-position: center;`"
        >
          <div
            class="text-white mt-auto d-flex flex-column"
            style="
              text-shadow: 1px 1px rgb(var(--v-theme-primary));
              text-align: start;
            "
          >
            <span class="font-weight-bold" style="font-size: 0.9rem">
              #{{ films.length - key }}
            </span>
            <span class="text-h5 font-weight-bold">
              {{ film?.title ? film.title.toUpperCase() : "" }}
            </span>
            <div>
              <template v-for="(director, directorKey) in film?.directors" :key="directorKey">
                <span style="font-size: 0.8rem" class="font-weight-regular">
                  {{ director ? director.toUpperCase() : ""
                  }}{{ directorKey < film.directors.length - 1 ? ", " : "" }}
                </span> </template
              >&nbsp;
              <template v-for="(country, countryKey) in film?.historic_countries" :key="countryKey">
                <span style="font-size: 0.8rem" class="font-weight-light">
                  {{ country ? country.toUpperCase() : ""
                  }}{{
                    countryKey < film.historic_countries.length - 1 ? ", " : ""
                  }}
                </span>
              </template>
              <span class="font-weight-light" style="font-size: 0.8rem"
                >&nbsp;{{ film?.year }}</span
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { getVal, setVal } from "@/services/DataService";

const isDataLoaded: Ref<Boolean> = ref(false);
const films: any = ref([]);

const getFilms = () => {
  getVal("listOfSeenfilms").then((val) => {
    if (val) {
      isDataLoaded.value = true;
      // Convert object to array if needed, or use directly if already array
      films.value = Array.isArray(val) ? val : Object.values(val);
    }
  });
};

interface Film {
  title?: string;
  directors?: string[];
  duration?: number;
  year?: number;
  overall?: number;
  historic_countries?: string[];
  still_url?: string;
  short_synopsis?: string;
  created_at?: string;
}

const calculateDirectorStats = (films: Film[]): any => {
  const result = films.reduce(
    (acc: Record<string, number>, film: Film) => {
      if (film.directors) {
        film.directors.forEach((director: string) => {
          if (acc[director]) {
            acc[director] += 1;
          } else {
            acc[director] = 1;
          }
        });
      }
      return acc;
    },
    {}
  );

  return Object.keys(result).map((key) => {
    return {
      name: key,
      count: result[key],
    };
  });
};

const calculateTotalWatchTime = (films: Film[]): string => {
  const totalMinutes = films.reduce((acc: number, film: Film) => {
    if (film.duration && typeof film.duration === 'number' && !isNaN(film.duration)) {
      acc += film.duration;
    }
    return acc;
  }, 0);

  if (!isFinite(totalMinutes) || totalMinutes < 0) {
    return "0h 0m";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

const calculateTotalFilms = (films: Film[]): number => {
  return films.length;
};

const calculateAverageFilmYear = (films: Film[]): string => {
  const totalYears = films.reduce((acc: number, film: Film) => {
    if (film.year) {
      acc += film.year;
    }
    return acc;
  }, 0);

  return (totalYears / films.length).toFixed(0);
};

const calculateAverageRating = (films: Film[]): string => {
  const totalRating = films.reduce((acc: number, film: Film) => {
    if (film.overall) {
      acc += film.overall;
    }
    return acc;
  }, 0);

  return (totalRating / films.length).toFixed(2);
};

const findTopLongestFilms = (films: Film[], top: number): Film[] => {
  return [...films] // Create a copy to avoid mutating original array
    .filter((film: Film) => film.duration && typeof film.duration === 'number' && !isNaN(film.duration))
    .sort((a: Film, b: Film) => {
      const durationA = a.duration || 0;
      const durationB = b.duration || 0;
      return durationB - durationA;
    })
    .slice(0, top);
};

const orderyByCountries = (films: Film[]): any => {
  const result = films.reduce(
    (acc: Record<string, number>, film: Film) => {
      if (film.historic_countries) {
        film.historic_countries.forEach((country: string) => {
          if (acc[country]) {
            acc[country] += 1;
          } else {
            acc[country] = 1;
          }
        });
      }
      return acc;
    },
    {}
  );

  // sort by count

  return Object.keys(result)
    .sort((a, b) => result[b] - result[a])
    .map((key) => {
      return {
        name: key,
        count: result[key],
      };
    });
};

const extractFilmData = (): any => {
  const result = films.value.map((film: Film) => {
    return {
      title: film?.title || '',
      directors: film?.directors || [],
      year: film?.year || 1995,
      duration: film?.duration || 120,
      still_url: film?.still_url || '',
      short_synopsis: film?.short_synopsis || '',
      historic_countries: film?.historic_countries || [],
      overall: film?.overall || 3,
      created_at: film?.created_at || new Date().toISOString(),
    };
  });
  setVal("listOfSeenfilms", result)
};

const generateStats = (): void => {
  const directorStats = calculateDirectorStats(films.value);
  const totalWatchTime = calculateTotalWatchTime(films.value);
  const totalFilms = calculateTotalFilms(films.value);
  const averageFilmYear = calculateAverageFilmYear(films.value);
  const averageRating = calculateAverageRating(films.value);
  const longestFilm = findTopLongestFilms(films.value, 20);
  const countries = orderyByCountries(films.value);

  setVal("filmStats", {
    directorStats,
    totalWatchTime,
    totalFilms,
    averageFilmYear,
    averageRating,
    longestFilm,
    countries
  });
};

onMounted(() => {
  getFilms();
});
</script>
