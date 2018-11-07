import {SousBlock} from './sous-block';

export class DocumentSousBlock {
	
	constructor(
		public id?: number,
		public version?: number,
		public titre?: string,
		public description?: string,
		public pathDocument?: string[],
		public sousBlock?: SousBlock
		) {
		// code...
	}
}