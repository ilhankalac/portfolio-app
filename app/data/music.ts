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
  { title: 'Time', artist: 'Hans Zimmer', note: 'Inception' },
  { title: 'Comfortably Numb', artist: 'Pink Floyd' },
  { title: 'D.A.N.C.E.', artist: 'Justice' },
  { title: 'Starman', artist: 'David Bowie' },
  { title: 'Breathe', artist: 'The Prodigy' },
  { title: '2021', artist: 'Justice' },
  { title: 'Echoes', artist: 'Pink Floyd' },
  { title: 'Sicko Mode', artist: 'Travis Scott' },
  { title: 'Circle of Life', artist: 'Hans Zimmer', note: 'The Lion King' },
  { title: 'One More Time', artist: 'Daft Punk' },
]

export const genres: Genre[] = [
  {
    id: 'film',
    label: 'Filmska muzika',
    icon: 'i-mdi-movie-open-outline',
    songs: [
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
]
