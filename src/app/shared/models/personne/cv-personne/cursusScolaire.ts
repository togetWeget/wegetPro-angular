export class CursusScolaire{
	constructor(
		public id?:number,
		public version?:number,
		public date?:string,
		public etablissement?:string,
		public diplome?:string,
		public formation?:string
	){}
}