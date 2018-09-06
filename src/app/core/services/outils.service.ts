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
  {id:4, name: "Benin"},
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

  langues = [
    {libelle: 'Français', name: 'Français'},
    {libelle: 'Anglais', name: 'Anglais'},
    {libelle: 'Allemand', name: 'Allemand'},
    {libelle: 'Espagnol', name: 'Espagnol'},
    {libelle: 'Italien', name: 'Italien'}
  ];
  constructor() { }

}
