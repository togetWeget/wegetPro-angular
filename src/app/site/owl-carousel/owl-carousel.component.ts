import { Component, OnInit,Input } from '@angular/core';
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
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.scss']
})
export class OwlCarouselComponent implements OnInit {
  competance:string;
  ville:string;

  title = 'GESTION DE PROJET DE MISE EN VALEUR DES COMPETENCES';
  compCtlr=new FormControl();
  filteredComp: Observable<Competence[]>;
  locaCtlr=new FormControl();
  filteredLoca: Observable<Localite[]>;
  competence:Competence[]=[
    {name:'Homme de Métier'},
    {name:'Informatique'},
    {name:'Salarié'},
    {name:'Banque'},
    {name:'Developpeur'},
    {name:'Maintenance'}
  ];
  localite:Localite[]=[
    {name:'Abidjan'},
    {name:'Koumassi'},
    {name:'yopougon'},
    {name:'cocody'},
    {name:'bingerville'},
    {name:'plateau'}
  ];
	public pre : any = "assets/images/cover";
	public back: any = "assets/images/cover4";
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
	  this.Background(7);
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

  Background(max){	
    this.back = this.pre + Math.floor(Math.random() * Math.floor(max))+".jpg";
  }

  onRegisterNow(){
    this.router.navigate(['/register']);
  }
  onRecherche(){
    this.competance=this.compCtlr.value ? this.compCtlr.value:'';
    this.ville=this.locaCtlr.value ? this.locaCtlr.value:'';
    this.router.navigate(['/site/abonnes/recherche'],{queryParams:{'competence':this.competance, 'ville':this.ville}});
  }
}
