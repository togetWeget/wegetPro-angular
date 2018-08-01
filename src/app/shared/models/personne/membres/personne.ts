import {Adresse} from '../../adresse/adresse';
import {Telephone} from './telephone';
import {Entreprise} from '../entreprise';
import {TypeStatut} from '../type-statut';
import {CvPersonne} from '../cv-personne';

export abstract class Personne {

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
    public cvPersonne ?: CvPersonne,
    public telephones?: Telephone[],
    ) {


  }


}
