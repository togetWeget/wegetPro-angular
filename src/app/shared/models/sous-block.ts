import {Adresse} from './adresse/adresse';
import {Block} from './block';


export class SousBlock {
	constructor (
		public id?: number,
		public version?: number,
		public nom?: string,
		public typeEtablissement?: string,
		public refSousBlock?: string,
		public presentation?: string,
		public description?: string,
		public pathPhoto?: string[],
		public pathLogo?: string,
		public adresse?: Adresse,
		public telephones?: string[],
		public block?: Block
		) {}
}
