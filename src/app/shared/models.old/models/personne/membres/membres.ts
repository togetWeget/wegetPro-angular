import {Personne} from './personne';

import {Telephone} from './telephone';
import {Adresse} from '../../adresse/adresse';
import {Entreprise} from '../entreprise';
import {TypeStatut} from '../type-statut';
import {CvPersonnes} from '../cv-personnes';

export class Membres extends Personne {

  constructor(
    public id ?: number,
    public version?: number,
    public cni ?: string,
    public titre ?: string,
    public nom ?: string,
    public prenom ?: string,
    public password ?: string,
    public repassword?: string,
    public actived ?: boolean,
    public nomComplet ?: string,
    public pathPhoto ?: string,
    public type?: string,
    public adresse ?: Adresse,
    public login ?: string,
    public entreprise ?: Entreprise,
    public typeStatut ?: TypeStatut,
    public cvPersonnes ?: CvPersonnes,
    public telephones?: Telephone[],
    public description?: string,
  ) {
    super(id, version, cni, titre, nom, prenom, password, repassword, actived, nomComplet,
      pathPhoto, type, adresse, login, entreprise, typeStatut, cvPersonnes, telephones);
  }
}

