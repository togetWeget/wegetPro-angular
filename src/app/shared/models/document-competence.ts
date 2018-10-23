import {Membre} from './personne/membres/membre';

export class DocumentCompetence {
	
	constructor(
		public id?: number,
		public version?: number,
		public titre?: string,
		public description?: string,
		public pathDocument?: string,
		public membre?: Membre,
		) {
		// code...
	}
}