import {SousBlock} from './sous-block';
<<<<<<< HEAD
import {Formation} from './ecole/formation';
=======
>>>>>>> develop

export class DocumentSousBlock {
	
	constructor(
		public id?: number,
		public version?: number,
		public titre?: string,
		public description?: string,
		public pathDocument?: string[],
<<<<<<< HEAD
		public sousBlock?: SousBlock,
		public formation?: Formation
=======
		public sousBlock?: SousBlock
>>>>>>> develop
		) {
		// code...
	}
}