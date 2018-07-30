import {Personnes} from './personne/membres/personne.model';
import {Block} from './Block.model';

export class Detailblocks {
  constructor(
    public id?: number,
    public version?: number,
    public blocks?: Block,
    public personne?: Personnes
  ) {
  }
}
