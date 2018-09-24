import {SousBlock} from './sous-block';

export class Chiffre {
	// private sousBlock: SousBlock;
	constructor(
		public id?: number,
		public version?: number,
		public titre?: string,
		public chiffre?: string,
		public description?: string,
		public id_SousBlock?: number
		// public sousBlock?: SousBlock
		) {}

	// public setSousBlock(sb: SousBlock){
	// 	this.sousBlock = sb;
	// }
}
