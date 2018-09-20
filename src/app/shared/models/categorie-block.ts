import {Block} from './block';

export class  CategorieBlock {
  constructor(public id?: number,
              public version?: number,
              public libelle?: string,
              public description?: string,
              public pathPhoto?: string,
              public block?: Block
             ) {}
}

