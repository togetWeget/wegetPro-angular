import {CursusScolaire} from './cv-personne/cursusScolaire';
import {Experience} from './cv-personne/experience';
import {Contrat} from './membres/contrat';

export class CvPersonne {
  constructor(
    public id?: number,
    public version?: number,
    public  titre?: string,
    public  diplome?: string,
    public  specialite?: string,
    public  anneExperience?: string,
    public  motivation?: string,
    public  fonctionActuelle?: string,
    public  domaine?: string,
    public  autreSpecialite?: string[],
    public  description?: string,
    public  pathCv?: string,
    public  experience?: Experience[],
    public  cursusScolaire?: CursusScolaire[],
    public contrat?:Contrat[]
    
  ) {
  }
}
