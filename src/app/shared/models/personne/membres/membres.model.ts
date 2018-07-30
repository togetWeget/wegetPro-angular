import {Personnes} from './personne.model';
import {Telephone} from './Telephone.model';
import {Adresse} from '../../adresse/Adresse.model';
import {Entreprise} from './entreprise';
import {TypeStatut} from './typeStatut.model';
import {CvPersonnes} from './cvPersonnes';


export class Membres extends Personnes {


  constructor(public id ?: number,
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
              public  type?: string,
              public adresse ?: Adresse,
              public login ?: string,
              public entreprise?: Entreprise,
              public typeStatut?: TypeStatut,
              public cvPersonnes?: CvPersonnes,
              public telephones?: Telephone[],
              public description?: string
  ) {
    super(id, version, cni, titre, nom, prenom, password, repassword, actived, nomComplet, pathPhoto, type, adresse, login, entreprise, typeStatut, cvPersonnes, telephones);

  }

}

