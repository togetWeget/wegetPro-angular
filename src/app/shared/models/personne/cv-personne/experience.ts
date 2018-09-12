import {Membre} from '../membres/membre';

export class Experience {
  constructor(
    public id?: number,
    public version?: number,
    public postOccupe?: string,
    public entreprise?: string,
    public dateDebut?: string,
    public dateFin?: string,
    public tache?: string,
    public lieu?: string,
    public membre?: Membre
  ) {
  }
}
