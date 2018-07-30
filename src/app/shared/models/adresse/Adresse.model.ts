export class Adresse {
  constructor(public codePostal?: string,
              public quartier?: string,
              public ville?: string,
              public pays?: string,
              public email?: string) {
    this.codePostal = codePostal;
    this.quartier = quartier;
    this.ville = ville;
    this.pays = pays;
    this.email = email;

  }


}
