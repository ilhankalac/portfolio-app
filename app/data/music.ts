/**
 * Single source of truth for the /favorite-songs page.
 *
 * Placeholder picks below — swap these for the real list. `topSongs` order
 * is the ranking (index 0 = #1); `genres` order controls the filter pill order.
 */

export interface Song {
  title: string
  artist: string
  /** Optional line of context — why it made the list, or where it's from. */
  note?: string
  /** External link to play the track (Spotify, YouTube, etc). */
  link?: string
  /** Cover art URL. Falls back to the genre icon when omitted. */
  cover?: string
}

export interface Genre {
  id: string
  label: string
  icon: string
  songs: Song[]
}

export const topSongs: Song[] = [
  { title: 'Lady Fantasy', artist: 'Camel', note: 'Mirage', cover: '/images/music/camel-mirage.webp', link: 'https://www.youtube.com/results?search_query=Camel+Lady+Fantasy' },
  { title: 'Beyond', artist: 'Daft Punk', note: 'Random Access Memories', cover: '/images/music/daft-punk-random-access-memories.webp', link: 'https://www.youtube.com/results?search_query=Daft+Punk+Beyond' },
  { title: 'Epitaph', artist: 'King Crimson', note: 'In the Court of the Crimson King', cover: '/images/music/king-crimson-in-the-court.webp', link: 'https://www.youtube.com/results?search_query=King+Crimson+Epitaph' },
  { title: 'Bullitt', artist: 'Lalo Schifrin', note: 'Bullitt', cover: '/images/music/lalo-schifrin-bullitt.webp', link: 'https://www.youtube.com/results?search_query=Lalo+Schifrin+Bullitt' },
  { title: 'El Dumo', artist: 'Smak', link: 'https://www.youtube.com/results?search_query=Smak+El+Dumo' },
  { title: 'Veridis Quo', artist: 'Daft Punk', note: 'Discovery', cover: '/images/music/daft-punk-discovery.webp', link: 'https://www.youtube.com/results?search_query=Daft+Punk+Veridis+Quo' },
  { title: 'Hipishizik Metafizik', artist: 'Rambo Amadeus', note: 'Hipishizik Metafizik', cover: '/images/music/rambo-amadeus-hipishizik-metafizik.webp', link: 'https://www.youtube.com/watch?v=rYZmNybdFSY' },
]

export const genres: Genre[] = [
  {
    id: 'film',
    label: 'Filmska muzika',
    icon: 'i-mdi-movie-open-outline',
    songs: [
      { title: 'Bullitt', artist: 'Lalo Schifrin', note: 'Bullitt', cover: '/images/music/lalo-schifrin-bullitt.webp', link: 'https://www.youtube.com/results?search_query=Lalo+Schifrin+Bullitt' },
      { title: 'Time', artist: 'Hans Zimmer', note: 'Inception' },
      { title: 'Circle of Life', artist: 'Hans Zimmer', note: 'The Lion King' },
      { title: 'Mombasa', artist: 'Hans Zimmer', note: 'Inception' },
      { title: 'Now We Are Free', artist: 'Lisa Gerrard & Hans Zimmer', note: 'Gladiator' },
    ],
  },
  {
    id: 'electronic',
    label: 'Elektronska',
    icon: 'i-mdi-waveform',
    songs: [
      { title: 'Beyond', artist: 'Daft Punk', note: 'Random Access Memories', cover: '/images/music/daft-punk-random-access-memories.webp', link: 'https://www.youtube.com/results?search_query=Daft+Punk+Beyond' },
      { title: 'Veridis Quo', artist: 'Daft Punk', note: 'Discovery', cover: '/images/music/daft-punk-discovery.webp', link: 'https://www.youtube.com/results?search_query=Daft+Punk+Veridis+Quo' },
      { title: 'D.A.N.C.E.', artist: 'Justice' },
      { title: '2021', artist: 'Justice' },
      { title: 'One More Time', artist: 'Daft Punk' },
      { title: 'Breathe', artist: 'The Prodigy' },
      { title: 'Adagio for Strings', artist: 'Tiësto' },
    ],
  },
  {
    id: 'prog-rock',
    label: 'Prog rock',
    icon: 'i-mdi-guitar-electric',
    songs: [
      { title: 'Lady Fantasy', artist: 'Camel', note: 'Mirage', cover: '/images/music/camel-mirage.webp', link: 'https://www.youtube.com/results?search_query=Camel+Lady+Fantasy' },
      { title: 'Epitaph', artist: 'King Crimson', note: 'In the Court of the Crimson King', cover: '/images/music/king-crimson-in-the-court.webp', link: 'https://www.youtube.com/results?search_query=King+Crimson+Epitaph' },
      { title: 'El Dumo', artist: 'Smak', link: 'https://www.youtube.com/results?search_query=Smak+El+Dumo' },
      { title: 'Comfortably Numb', artist: 'Pink Floyd' },
      { title: 'Echoes', artist: 'Pink Floyd' },
      { title: '21st Century Schizoid Man', artist: 'King Crimson' },
      { title: 'Close to the Edge', artist: 'Yes' },
    ],
  },
  {
    id: 'rock',
    label: 'Rock',
    icon: 'i-mdi-radio-tower',
    songs: [
      { title: 'Starman', artist: 'David Bowie' },
      { title: 'Paranoid Android', artist: 'Radiohead' },
      { title: 'Karma Police', artist: 'Radiohead' },
    ],
  },
  {
    id: 'balkan',
    label: 'Balkan funk',
    icon: 'i-mdi-saxophone',
    songs: [
      {
        title: 'Hipishizik Metafizik',
        artist: 'Rambo Amadeus',
        note: 'Hipishizik Metafizik',
        cover: '/images/music/rambo-amadeus-hipishizik-metafizik.webp',
        link: 'https://www.youtube.com/watch?v=rYZmNybdFSY',
      },
      {
        title: 'F.A.P. Mašina',
        artist: 'Rambo Amadeus',
        note: 'Koncert u KUD France Prešeren',
        cover: '/images/music/rambo-amadeus-koncert-kud.webp',
        link: 'https://www.youtube.com/watch?v=9Ireu1PW2nU',
      },
    ],
  },
]
