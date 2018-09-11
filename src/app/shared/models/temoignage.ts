
export class Temoignage {
	constructor(
		public id?: number,
		public version?: number,
		public titre?: string,
		public contenu?: string,
		public auteur?: string,
		public pathPhoto?: string,
		public id_SousBlock?: number
		) {}
}