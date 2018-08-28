import { Pays } from '../parametres/pays';
export class Adresse {

  constructor(public codePostal?: string,
              public quartier?: string,
              public ville?: string,
              public pays?: Pays[],
              public email?: string
              ) {}
}
