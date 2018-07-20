import {Personne} from './personne';

import {Telephone} from './telephone';
import {Adresse} from '../../adresse/adresse';

export class Membres extends Personne {


  constructor(public id?: number,
              public version?: number,
              public cni?: string,
              public titre?: string,
              public nom?: string,
              public prenom?: string,
              public login?: string,
              public password?: string,
              public repassword?: string,
              public actived?: boolean,
              public nomComplet?: string,
              public  nomSociete?: string,
              public description?: string,
              public diplome?: string,
              public anneExperience?: string,
              public statut?: string,
              public specialite?: string,
              public pathPhoto?: string,
              public adresse?: Adresse,
              public telephones?: Telephone[],
              public type?: string
  ) {
    super(id, version, titre, nom, prenom, cni, login, password, repassword, actived,  nomComplet, pathPhoto, adresse, telephones, type);
  }
}

