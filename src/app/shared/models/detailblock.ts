import {Personne} from './personne/membres/personne';
import {Block} from './block';

export class Detailblock {
  constructor(
    public id?: number,
    public version?: number,
    public description?: string,
    public pathPhoto?: string,
    public pathPhotoCouveture?: string,
    public block?: Block,
    public personne?: Personne
  ) {
  }
}
