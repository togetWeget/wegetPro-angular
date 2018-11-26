import {SousBlock} from './sous-block';
import {Formation} from './ecole/formation';

export class DocumentSousBlock {
	
	constructor(
		public id?: number,
		public version?: number,
		public titre?: string,
		public description?: string,
		public pathDocument?: string[],
		public sousBlock?: SousBlock,
		public formation?: Formation
		) {
		// code...
	}
}