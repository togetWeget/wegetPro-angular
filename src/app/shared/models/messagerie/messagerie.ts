import {Personne} from '../personne/membres/personne';
import {Expediteur} from './expediteur';
import {Message} from './message';

export class Messagerie {
  constructor(
    public id?: number,
    public version?: number,
    public personne?: Personne,
    public message?: Message,
    public expediteur?: Expediteur,
  ) {
  }

}
