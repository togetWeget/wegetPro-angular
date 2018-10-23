import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutilsService {

  genres = ['Homme', 'Femme'];
  pays = [
  {id:0, name: "Côte d'Ivoire"},
  {id:1, name: "Ghana"},
  {id:2, name: "Burkina Faso"},
  {id:3, name: "Senegal"},
  {id:4, name: "Benin"}
  ];

  villes = [
  {id:0, name: "Yamoussoukro"},
  {id:1, name: "Abidjan"},
  {id:2, name: "Bouaké"},
  {id:3, name: "Sassandra"},
  {id:4, name: "San Pédro"}
  ];

  civilites = [
    {libelle: 'Mlle', name: 'Mlle'},
    {libelle: 'Mme', name: 'Mme'},
    {libelle: 'Mr', name: 'Mr'}
  ];
  typeTelephones = [
    {libelle: 'mobile', name: 'mobile'},
    {libelle: 'bureau', name: 'bureau'},
    {libelle: 'domicile', name: 'domicile'}
  ];

  typeEtablissement = [
    {libelle: 'Maternelles, primaires', name: 'Maternelles, primaires'},
    {libelle: 'Lycées, Collèges', name: 'Lycées, Collèges'},
    {libelle: 'Universités, Grandes écoles', name: 'Universités, Grandes écoles'}
  ];

  langues = [
    {libelle: 'Français', name: 'Français'},
    {libelle: 'Anglais', name: 'Anglais'},
    {libelle: 'Allemand', name: 'Allemand'},
    {libelle: 'Espagnol', name: 'Espagnol'},
    {libelle: 'Italien', name: 'Italien'}
  ];

  niveauEtude = [
    {name: 'Licence 1'},
    {name: 'Licence 2'},
    {name: 'Licence 3'},
    {name: 'master 1'},
    {name: 'master 2'}
  ];
  diplomes = [
    {name: 'Bts'},
    {name: 'DUT'},
    {name: 'Master'},
    {name: 'Doctorat'},
    {name: 'Licence'},
    {name: 'Bac'},
    {name: 'BEPC'}
  ];

  private baseUrl: string = "http://wegetback:8080";
  constructor() { }

  public getBaseUrl(): string{
    return this.baseUrl;
  }

  public arrayRemoveAt(tableau: any[], element: any): any[]{
    const index = tableau.indexOf(element, 0);
    if(index > -1) {
      tableau.splice(index, 1);
    }
    return tableau;
  }
  public arrayContain(tableau: any[], element: any): boolean{
    let result: boolean = false;
    for(let tab of tableau){
      try{
        if(tab === element){
          result = true;
        }
      }catch(e){}
    }
    return result;
  }

  public stringContain(chaine: string, search: string): boolean{
    let result: boolean = false;
    if(chaine.match(search)){
      result = true;
    }
    return result;
  }

  public arrayContainLessOne(tableau: any[], elements: any[]): boolean{
    let result: boolean = false;
    for(let tab of tableau){
      for(let elt of elements){
        try{
          if(tab === elt){
            result = true;
          }
        }catch(e){}
      }
    }
    return result;
  }

}
