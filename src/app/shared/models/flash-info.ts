import {SousBlock} from './sous-block';

export class FlashInfo {
	constructor(
		public id?: number,
		public version?: number,
		public contenu?: string,
		public etat?: boolean,
		public date?: string,
		public sousBlock?: SousBlock
		){}
}
