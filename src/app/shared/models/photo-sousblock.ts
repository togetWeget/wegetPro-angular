import {Membre} from './personne/membres/membre';
import {SousBlock} from './sous-block';

export class PhotoSousblock {
	
	constructor(
		public id?: number,
		public version?: number,
		public libelle?: string,
		public description?: string,
		public date?: any,
		public pathPhoto?: string[],
		public pathVideo?: string[],
		public membre?: Membre,
		public sousBlock?: SousBlock
		) {
		// code...
	}
}