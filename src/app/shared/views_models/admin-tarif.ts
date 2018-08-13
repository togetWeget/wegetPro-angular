import {Tarif} from '../models/tarif/tarif';
import {Block} from '../models/block';


export class AdminTarif {
	constructor (
		public tarif?: Tarif,
		public block?: Block
		) {}

	public setTarif (tar: Tarif) {
		this.tarif = tar;
	}

	public setBlock (bl: Block) {
		this.block = bl;
	}
}
