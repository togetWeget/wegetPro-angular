import {Adresse} from './adresse/adresse';
import {Block} from './block';
import {Detailblock} from './detailblock';
import {Partenaire} from './partenaire';
import {Temoignage} from './temoignage';
import {Chiffre} from './chiffre';
import {Telephone} from './personne/membres/telephone';


export class SousBlock {0
	constructor (
		public id?: number,
		public version?: number,
		public nom?: string,
		public typeEtablissement?: string,
		public refSousBlock?: string,
		public presentation?: string,
		public description?: string,
		public pathPhotoCouverture?: string[],
		public pathLogo?: string,
		public adresse?: Adresse,
		public telephones?: Telephone[],
		public detailBlock?: Detailblock,
		public chiffre?: Chiffre[],
		public partenaire?: Partenaire[],
		public temoignage?: Temoignage[],
		public idBlock?: number
		// public detailBlock?: number
		) {}
}
