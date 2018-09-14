import { Membre } from './personne/membres/membre';
export class DocCompetence{
	constructor(
		public id?: number,
		public version?: number,
		public docPath?: string,
		public titre?: string,
		public description?: string,
		public membre?: Membre,
	){}
}