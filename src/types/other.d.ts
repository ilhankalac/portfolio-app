export interface IExperience {
  id: number;
  title?: string;
  date?: string;
  description?: string;
  logoSrc?: string;
  projects: any
  position?: string
}

export interface IColleagueInfo {
  id?: number;
  fullName?: string;
  role?: string;
  textHtml?: string
  avatarSrc?: string;
  githubLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  showPublic?: boolean;
}

export interface ISkill {
  name: string;
  icon: string;
  key: number;
}

export interface IFreeProject {
  key: number;
  title: string;
  description: string;
  source_code: string;
  dateOfCreation: string;
  icon: string;
  image: string;
  live_demo: string;
  technologies?: any
}

export interface IContact {
  email: string;
  message: string;
  timeStamp: string;
}