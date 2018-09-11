import { Pays } from '../parametres/pays';
export class Adresse {

  constructor(public boitePostal?: string,
              public  email?: string,
              public  pays?: string,
              public  ville?: string,
              public  quartier?: string,
              public  adresseGeographique?: string,
              public  siteWeb?: string

              ) {}
}
