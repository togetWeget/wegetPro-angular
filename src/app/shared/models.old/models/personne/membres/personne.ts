import {Adresse} from '../../adresse/adresse';
import {Telephone} from './telephone';
import {Entreprise} from '../entreprise';
import {TypeStatut} from '../type-statut';
import {CvPersonnes} from '../cv-personnes';

export abstract class Personne {


  constructor(
    public _id ?: number,
    public version?: number,
    public _cni ?: string,
    public _titre ?: string,
    public _nom ?: string,
    public _prenom ?: string,
    public _password ?: string,
    public _repassword?: string,
    public _actived ?: boolean,
    public _nomComplet ?: string,
    public _pathPhoto ?: string,
    public  _type?: string,
    public _adresse ?: Adresse,
    public _login ?: string,
    public _entreprise ?: Entreprise,
    public _typeStatut ?: TypeStatut,
    public _cvPersonnes ?: CvPersonnes,
    public _telephones?: Telephone[],
    ) {


  }


}
