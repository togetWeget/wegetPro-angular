import {Adresse} from '../../adresse/adresse';
import {Telephone} from './telephone';
import {Entreprise} from '../entreprise';
import {TypeStatut} from '../type-statut';
import {CvPersonne} from '../cv-personne';
import {Contrat} from './contrat';
import {LangueParle} from '../cv-personne/langueParle';

export class Personne {

    id : number;
    version: number;
    cni : string;
    titre : string;
    nom : string;
    prenom : string;
    password : string;
    repassword: string;
    actived : boolean;
    nomComplet : string;
    pathPhoto : string;
    pathPhotoCouveture : string;
    nombreVue : string;
    groupSanguin : string;
    dateNaissance : Date;
    genre : string;
    type: string;
    adresse : Adresse;
    login : string;
    entreprise : Entreprise;
    telephones: Telephone[];
    langues: LangueParle[];
    typeStatut : TypeStatut;
    contrat: Contrat;
    couleur: string;
    description: string;
  constructor(
    ) {


  }


}
