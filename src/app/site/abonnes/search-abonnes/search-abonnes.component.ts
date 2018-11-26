import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
export interface Competence {
  name: string;
}

export interface Localite {
  name: string;
  
}

@Component({
  selector: 'app-search-abonnes',
  templateUrl: './search-abonnes.component.html',
  styleUrls: ['./search-abonnes.component.scss']
})
export class SearchAbonnesComponent implements OnInit {
  competance:string;
  ville:string;
  motCle:string;
  motCtlr = new FormControl();
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
  onRecherche(){
    this.competance=this.compCtlr.value ? this.compCtlr.value:'';
    this.ville=this.locaCtlr.value ? this.locaCtlr.value:'';
    this.motCle=this.motCtlr.value ? this.motCtlr.value:'';
    this.router.navigate(['/site/abonnes/recherche'],{queryParams:{'competence':this.competance, 'ville':this.ville,'valeur':this.motCle}});
  }
}
