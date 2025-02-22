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
          :style="`min-height: 200px; background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${film?.film?.still_url}); background-size: cover; background-position: center;`"
        >
          <div
            class="text-white mt-auto d-flex flex-column"
            style="
              text-shadow: 1px 1px rgb(var(--v-theme-primary));
              text-align: start;
            "
          >
            <span class="font-weight-bold" style="font-size: 0.9rem">
              #{{ 1148 - key }}
            </span>
            <span class="text-h5 font-weight-bold">
              {{ film?.film?.title ? film.film.title.toUpperCase() : "" }}
            </span>
            <div>
              <template v-for="(director, key) in film.film.directors">
                <span style="font-size: 0.8rem" class="font-weight-regular">
                  {{ director.name ? director.name.toUpperCase() : ""
                  }}{{ key < film.film.directors.length - 1 ? ", " : "" }}
                </span> </template
              >&nbsp;
              <template v-for="(country, key) in film.film.historic_countries">
                <span style="font-size: 0.8rem" class="font-weight-light">
                  {{ country ? country.toUpperCase() : ""
                  }}{{
                    key < film.film.historic_countries.length - 1 ? ", " : ""
                  }}
                </span>
              </template>
              <span class="font-weight-light" style="font-size: 0.8rem"
                >&nbsp;{{ film?.film?.year }}</span
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
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getVal, pushVal, setVal } from "@/services/DataService";

const isDataLoaded: Ref<Boolean> = ref(false);
const films: any = ref([]);

const getFilms = () => {
  getVal("ratings").then((val) => {
    if (val) {
      isDataLoaded.value = true;
      films.value = val;
    }
  });
};

interface Director {
  name: string;
}

interface FilmDetails {
  directors?: Director[];
  duration?: number;
  year?: number;
}

interface Film {
  film: FilmDetails;
  overall?: number;
}

interface FilmData {
  value: Film[];
}

const calculateDirectorStats = (films: FilmData): any => {
  const result = films.value.reduce(
    (acc: Record<string, number>, film: Film) => {
      if (film.film.directors) {
        film.film.directors.forEach((director) => {
          if (acc[director.name]) {
            acc[director.name] += 1;
          } else {
            acc[director.name] = 1;
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

const calculateTotalWatchTime = (films: FilmData): string => {
  const totalMinutes = films.value.reduce((acc: number, film: Film) => {
    if (film.film.duration) {
      acc += film.film.duration;
    }
    return acc;
  }, 0);

  return `${(totalMinutes / 60).toFixed(2)}`;
};

const calculateTotalFilms = (films: FilmData): number => {
  return films.value.length;
};

const calculateAverageFilmYear = (films: FilmData): string => {
  const totalYears = films.value.reduce((acc: number, film: Film) => {
    if (film.film.year) {
      acc += film.film.year;
    }
    return acc;
  }, 0);

  return (totalYears / films.value.length).toFixed(0);
};

const calculateAverageRating = (films: FilmData): string => {
  const totalRating = films.value.reduce((acc: number, film: Film) => {
    if (film.overall) {
      acc += film.overall;
    }
    return acc;
  }, 0);

  return (totalRating / films.value.length).toFixed(2);
};

const findTopLongestFilms = (films: FilmData, top: number): Film[] => {
  return films.value
    .sort((a: Film, b: Film) => {
      if (a.film.duration && b.film.duration) {
        return b.film.duration - a.film.duration;
      }
      return 0;
    })
    .slice(0, top);
};

const orderyByCountries = (films: FilmData): any => {
  const result = films.value.reduce(
    (acc: Record<string, number>, film: any) => {
      if (film.film.historic_countries) {
        film.film.historic_countries.forEach((country: any) => {
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
  const result = films.value.map((film: any) => {
    return {
      title: film?.film?.title ? film.film.title : '',
      directors: film?.film?.directors ? film.film.directors.map((director: any) => director.name) : [],
      year: film?.film?.year ? film.film.year : '1995',
      duration: film?.film?.duration ? film.film.duration : '120',
      rating: film?.overall ? film.overall : '',
      still_url: film?.film?.still_url ? film.film.still_url : '',
      short_synopsis: film?.film?.short_synopsis ? film.film.short_synopsis : '',
      historic_countries: film?.film?.historic_countries ? film.film.historic_countries : [],
      overall: film?.overall ? film.overall : '3',
      created_at: film?.created_at ? film.created_at : new Date().toISOString(),
    };
  });
  setVal("listOfSeenfilms", result)
};

const generateStats = (): void => {
  const directorStats = calculateDirectorStats(films);
  const totalWatchTime = calculateTotalWatchTime(films);
  const totalFilms = calculateTotalFilms(films);
  const averageFilmYear = calculateAverageFilmYear(films);
  const averageRating = calculateAverageRating(films);
  const longestFilm = findTopLongestFilms(films, 20);
  const countries = orderyByCountries(films);

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
