import {AdminTableValue} from './admin-table-value';
import {AdminTableGroup} from './admin-table-group';

export class AdminTable<T> {
	constructor (
		public titles?: string[],
		public values?: T[],
		public rows?: AdminTableGroup[],
		public vals?: any[],
		public customTitles?: string[]
		) {
		this.rows = this.setValuesT(this.values);
		this.customTitles = this.setCustomTitles(this.values);
		this.vals = this.setVals(this.values);
	}

	public setVals (values: T[]): any[] {
		let rows: any[] = [];
		let keys: string[];
		keys = Object.keys(values[0]); //recuperation des clés
		for(let cp=0; cp<values.length; cp++) {
			let valueT: any[] = [];
			let i = 0;
			for(let key of keys) {
				valueT[i] = values[cp][key];
				i++;
			}
			rows[cp] = valueT;	
		}
		return rows;
	}
	public setValuesT (values: T[]): AdminTableGroup[] {
		let rows: AdminTableGroup[] = [];
		let keys: string[];
		keys = Object.keys(values[0]); //recuperation des clés
		for(let cp=0; cp<values.length; cp++) {
			let valueT: AdminTableValue[] = [];
			let i = 0;
			for(let key of keys) {
				valueT[i] = new AdminTableValue(key, values[cp][key]);
				i++;
			}
			rows[cp] = new AdminTableGroup(valueT);	
		}
		return rows;
	}
	public setCustomTitles (values: T[]): string[] {
		let rows: AdminTableGroup[] = [];
		let keys: string[];
		keys = Object.keys(values[0]); //recuperation des clés
		return keys;
	}
}

