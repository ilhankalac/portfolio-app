export interface IExperience {
  id: number | string
  title?: string
  date?: string
  description?: string
  logoSrc?: string
  projects: any
  position?: string
  location?: string
  company_link?: string
}

export interface IColleagueInfo {
  id?: number
  fullName?: string
  role?: string
  textHtml?: any
  avatarSrc?: string
  githubLink?: string
  linkedinLink?: string
  instagramLink?: string
  showPublic?: boolean
}

export interface ISkill {
  name: string
  icon: string
  key: number
}

export interface IFreeProject {
  key: number
  title: string
  description: string
  source_code: string
  dateOfCreation: string
  icon: string
  image: string
  live_demo: string
  technologies?: any
}

export interface IContact {
  email: string
  message: string
  timeStamp: string
}

export interface IQuote {
  key: string
  text: string
  author: string
}

export interface IFilm {
  still_url: string;
  overall: number;
  duration: string;
  title: string;
  directors: string[];
  historic_countries: string[];
  year: number;
  short_synopsis: string;
  created_at: string;
}

export interface IDirectorStats {
  name: string;
  count: number;
}

export interface IFilmStatsData {
  totalFilms: number;
  directorStats: IDirectorStats[];
  [key: string]: any; 
}