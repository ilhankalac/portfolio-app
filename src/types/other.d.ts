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
	id: number;
	fullName: string;
  role: string;
  textHtml: string
	avatarSrc: string;
	githubLink: string;
  linkedinLink: string;
  instagramLink: string;
}