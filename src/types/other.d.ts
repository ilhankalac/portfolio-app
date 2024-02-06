export interface IExperience {
	id: number;
	title?: string;
	date?: string;
	description?: string;
	logoSrc?: string;
	projects: any
}

export interface IColleagueInfo {
	id: number;
	fullName: string;
  role: string;
  text: string
}