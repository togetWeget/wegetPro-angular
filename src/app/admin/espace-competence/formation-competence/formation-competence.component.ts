import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { CursusScolaire } from '../../../shared/models/personne/cv-personne/cursusScolaire';

@Component({
  selector: 'app-formation-competence',
  templateUrl: './formation-competence.component.html',
  styleUrls: ['./formation-competence.component.scss']
})
export class FormationCompetenceComponent implements OnInit {
	formationForm: FormGroup;
	cursus : CursusScolaire[]=[];

	domaines =[
	    {name:'informatique', libelle:'Informatique'},
	    {name:'banque', libelle:'Banque'},
	    {name:'finance', libelle:'Finance'},
	    {name:'mecanique', libelle:'Mecanique'}
  	];
  	diplomes=[
	    {name:'CEPE', libelle:'CEPE'},
	    {name:'BEPC', libelle:'BEPC'},
	    {name:'CAP', libelle:'CAP'},
	    {name:'BEP', libelle:'BEP'},
	    {name:'BAC', libelle:'BAC'},
	    {name:'BTS', libelle:'BTS'},
	    {name:'DUT', libelle:'DUT'},
	    {name:'DEUG', libelle:'DEUG'},
	    {name:'LICENCE', libelle:'LICENCE'},
	    {name:'MAITRISE', libelle:'MAITRISE'}
  	];
  	constructor(private fb: FormBuilder) {

  	}

  	ngOnInit() {
  		this.initForm();
  	}
  	initForm(){
  		const formationInit = new FormArray([]);

  		if (this.cursus.length !== 0) {
  			for (const format of this.cursus) {
  				formationInit.push(
	  				this.fb.group({
	  					id: format.id,
	        			version: format.version ,
	        			date: format.date,
	        			etablissement: format.etablissement,
	        			diplome: format.diplome,
	        			formation: format.formation ,
	        			membre: format.membre
	        		})
        		);
  			}
  		}
  		this.formationForm = this.fb.group({
  				formations:formationInit,
  			}
  		)
  	}

  	onSubmit(){

  	}

  	ajouterFormation() {   
    	(<FormArray>this.formationForm.get('formations')).push(
      		this.fb.group({
        		id: [null],
        		version: [0],
        		date:[''],
        		etablissement:[''],
        		diplome:[''],
        		formation: [''],
        		membre: ['']
			})
    	);
  	}

  	removeFormation(i: number) {
    	(<FormArray>this.formationForm.get('formations')).removeAt(i);
  	}

	get formations() {
    	return this.formationForm.get('formations') as FormArray;
  	}
}
