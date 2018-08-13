import {Block} from '../block';

export class Tarif {

  constructor(public id?: number,
              public version?: number,
              public prix?: number,
              public description?: string,
              public block?: Block,
              public publicite?: number ) {
  }
}

