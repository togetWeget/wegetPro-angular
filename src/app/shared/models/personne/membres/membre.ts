import {Personne} from './personne';

import {Telephone} from './telephone';
import {Adresse} from '../../adresse/adresse';
import {Entreprise} from '../entreprise';
import {TypeStatut} from '../type-statut';
import {CvPersonne} from '../cv-personne';
import {Contrat} from './contrat';
import {CursusScolaire} from '../cv-personne/cursusScolaire';
import {LangueParle} from '../cv-personne/langueParle';

export class Membre extends Personne {

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
    public pathPhotoCouveture ?: string,
    public nombreVue ?: string,
    public groupSanguin ?: string,
    public dateNaissance ?: Date,
    public genre ?: string,
    public type?: string,
    public adresse ?: Adresse,
    public login ?: string,
    public entreprise ?: Entreprise,
    public telephones?: Telephone[],
    public langues?: LangueParle[],
    public typeStatut ?: TypeStatut,
    public couleur?: string,
     public cvPersonne ?: CvPersonne,
    public description?: string,
   
  ) {
    super(
        id ,
        version,
        cni ,
        titre ,
        nom ,
        prenom ,
        password ,
        repassword,
        actived ,
        nomComplet ,
        pathPhoto ,
        pathPhotoCouveture ,
        nombreVue ,
        groupSanguin ,
        dateNaissance ,
        genre ,
        type,
        adresse ,
        login ,
        entreprise ,
        telephones,
        langues,
        typeStatut ,
        couleur
      );
  }

  

}

