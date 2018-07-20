import {Adresse} from '../../adresse/adresse';
import {Telephone} from './telephone';

export abstract class Personne {


  constructor(public _id ?: number,
              public version?: number,
              public _titre ?: string,
              public _nom ?: string,
              public _prenom ?: string,
              public _cni ?: string,
              public _login ?: string,
              public _password ?: string,
              public _repassword?: string,
              public _actived ?: boolean,
              public _nomComplet ?: string,
              public _pathPhoto ?: string,
              public _adresse ?: Adresse,
              public _telephones?: Telephone[],
              public  _type?: string) {


  }


}
