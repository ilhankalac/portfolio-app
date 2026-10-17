/**
 * Countries and cities I've visited, compiled from the locations of my photos.
 * Transit-only stops (airports, drives through a country) are left out.
 */

export interface Country {
  name: string
  /** ISO 3166-1 alpha-2; shown as the badge and used for photo paths. */
  code: string
  /** Year of the first visit, from the earliest photo taken there. */
  since: number
  cities: string[]
  /**
   * Number of photos in /public/images/travel/<code>/ (1.webp … n.webp, plus a
   * 1-sm.webp card cover). The first one is the cover. 0 when there are none.
   */
  photos: number
}

/** In the order I first went, most recent first. */
export const countries: Country[] = [
  { name: 'Finland', code: 'FI', since: 2026, photos: 3, cities: ['Helsinki'] },
  { name: 'Spain', code: 'ES', since: 2026, photos: 4, cities: ['Barcelona'] },
  { name: 'Sweden', code: 'SE', since: 2025, photos: 2, cities: ['Malmö'] },
  { name: 'Denmark', code: 'DK', since: 2025, photos: 4, cities: ['Copenhagen', 'Helsingør'] },
  { name: 'Albania', code: 'AL', since: 2024, photos: 0, cities: ['Tirana'] },
  { name: 'Croatia', code: 'HR', since: 2024, photos: 2, cities: ['Dubrovnik'] },
  { name: 'Austria', code: 'AT', since: 2024, photos: 4, cities: ['Graz', 'Vienna'] },
  { name: 'Japan', code: 'JP', since: 2023, photos: 4, cities: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'] },
  { name: 'Qatar', code: 'QA', since: 2023, photos: 1, cities: ['Doha'] },
  { name: 'Germany', code: 'DE', since: 2022, photos: 3, cities: ['Giessen', 'Marburg', 'Frankfurt', 'Berlin', 'Hamburg', 'Bremen', 'Oldenburg', 'Hannover', 'Stuttgart', 'Dortmund', 'Mainz', 'Rostock'] },
  { name: 'North Macedonia', code: 'MK', since: 2022, photos: 0, cities: ['Skopje'] },
  { name: 'Bosnia and Herzegovina', code: 'BA', since: 2021, photos: 4, cities: ['Sarajevo'] },
  { name: 'Serbia', code: 'RS', since: 2018, photos: 3, cities: ['Belgrade', 'Novi Sad', 'Sremski Karlovci', 'Novi Pazar', 'Zlatibor', 'Nova Varoš'] },
]

export const continents = ['Europe', 'Asia']

/** Full-size photo URLs for a country; the first is the cover. */
export const photoUrls = (country: Country) =>
  Array.from({ length: country.photos }, (_, i) => `/images/travel/${country.code.toLowerCase()}/${i + 1}.webp`)

/** Smaller cover used on the card. */
export const coverUrl = (country: Country) =>
  country.photos ? `/images/travel/${country.code.toLowerCase()}/1-sm.webp` : null
