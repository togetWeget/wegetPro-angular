import {Membre} from '../membres/membre';

export class Experience {
  constructor(
    public id?: number,
    public version?: number,
    public postOccupe?: string,
    public entreprise?: string,
    public periode?: string,
    public tache?: string,
    public membre?: Membre
  ) {
  }
}
