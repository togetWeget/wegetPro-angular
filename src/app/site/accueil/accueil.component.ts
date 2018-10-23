import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Competence {
  name: string;
}

export interface Localite {
  name: string;
  
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss', '../layout/layout.component.scss'],
  
})
export class AccueilComponent implements OnInit {

  title = 'GESTION DE PROJET DE MISE EN VALEUR DES COMPETENCES';
  compCtlr=new FormControl();
  filteredComp: Observable<Competence[]>;
  locaCtlr=new FormControl();
  filteredLoca: Observable<Localite[]>;
  competence:Competence[]=[
    {name:'Homme de Métier'},
    {name:'Informatique'},
    {name:'Salarié'},
    {name:'Banque'}
  ];
  localite:Localite[]=[
    {name:'Koumassi'},
    {name:'yopougon'},
    {name:'cocody'},
    {name:'bingerville'},
    {name:'plateau'}
  ];
  

  constructor(private router: Router) { 
  
    this.filteredComp = this.compCtlr.valueChanges
      .pipe(
        startWith(''),
        map(comp => comp ? this._filterComp(comp) : this.competence.slice())
      );
       
      this.filteredLoca = this.locaCtlr.valueChanges
      .pipe(
        startWith(''),
        map(loca => loca? this._filterLoca(loca) : this.localite.slice())
      );
  }

  ngOnInit() {
  }
  private _filterComp(value: string): Competence[] {
    const filterValue = value.toLowerCase();

    return this.competence.filter(comp => comp.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterLoca(value: string): Localite[] {
    const filterValue = value.toLowerCase();

    return this.localite.filter(loca => loca.name.toLowerCase().indexOf(filterValue) === 0);
  }
  onBlock() {
    this.router.navigate(['/block']);
  }
}
