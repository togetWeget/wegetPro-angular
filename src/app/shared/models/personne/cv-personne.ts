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
    public  autreSpecialite?: string,
    public  description?: string,
    public  pathCv?: string,
  ) {
  }
}
