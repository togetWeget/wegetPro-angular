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
  {id:4, name: "Senegal"},
  ];
  constructor() { }

}
