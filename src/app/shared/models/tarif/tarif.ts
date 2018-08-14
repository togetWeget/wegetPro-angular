import {Block} from '../block';

export class Tarif {

  constructor(public id?: number,
              public version?: number,
              public titre?: string,
              public prix?: number,
              public dureeTarif?: string,
              public description?: string,
              public block?: Block,
              ) {
  }
}

