import {Personne} from './personne/membres/personne';
import {Block} from './block';

export class Detailblock {
  constructor(
    public id?: number,
    public version?: number,
    public block?: Block,
    public personne?: Personne
  ) {
  }
}
