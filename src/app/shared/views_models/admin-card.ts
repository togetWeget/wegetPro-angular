import {PersonalButton} from './personal-button';

export class AdminCard {
	constructor (
		public title?: string,
		public ajout_link?: string,
		public button?: PersonalButton[]
		) {}
}
