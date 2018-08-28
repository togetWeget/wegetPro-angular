import {Experience} from './cv-personne/experience';
import {CursusScolaire} from './cv-personne/cursusScolaire';
export class CvPersonne {
  constructor (
    public id?: number,
    public version?: number,
    public diplome?: string,
    public specialite?: string,
    public anneExperience?: string,
    public description?: string,
    public experience?:Experience[],
    public cursusScolaire?:CursusScolaire[],
    public langue?: string[]
  ) {}
}
