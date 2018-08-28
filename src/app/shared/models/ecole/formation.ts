export class  Formation{
	
	constructor(
		public id?:number,
		public version?:number,
		public titre?:string,
		public description?:string,
		public formation_niveau?:string,
		public contenu?:string,
		public dureeFormation?:string,
		public diplome?:string,
		public formation_prix?:string
	) {}
}