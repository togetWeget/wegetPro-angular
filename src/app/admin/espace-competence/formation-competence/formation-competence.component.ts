import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { CursusScolaire } from '../../../shared/models/personne/cv-personne/cursusScolaire';
import { CompetenceService } from '../../../core/services/competence.service';
import { MembreService } from '../../../core/services/personne/membre/membre.service';
import {Membre} from '../../../shared/models/personne/membres/membre';

@Component({
  selector: 'app-formation-competence',
  templateUrl: './formation-competence.component.html',
  styleUrls: ['./formation-competence.component.scss']
})
export class FormationCompetenceComponent implements OnInit {
	formationForm: FormGroup;
	cursus : CursusScolaire[]=[];
	membre : Membre;

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
  	constructor(private fb: FormBuilder,
  				private membreService: MembreService,
  				private competenceService: CompetenceService) {

  	}

  	ngOnInit() {
  		this.membreService.getMembreByLogin(localStorage.getItem('log'))
      	.subscribe(res => {
        this.membre = res.body;
        if (res.status === 0) {
          this.initForm();
        }
      });
  		// this.initForm();
  	}

  	initForm(){
  		const formationInit = new FormArray([]);
  		if (this.cursus.length !== 0) {
  			for (const format of this.cursus) {
  				formationInit.push(
	  				this.fb.group({
	  					id: format.id,
        			version: format.version,
        			date: format.date,
        			etablissement: format.etablissement,
        			diplome: format.diplome,
        			formation: format.formation,
        			membre: this.membre
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
  		let cursusModif: CursusScolaire[];
	    cursusModif = this.convertisseur(this.formationForm);
      console.log(cursusModif);
      this.competenceService.ajouterCursusScolaire(cursusModif)
      .subscribe((data)=>{      
	      console.log('SUCCESS', data);
      });
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
        		membre: [this.membre]
			})
    	);
    	
  	}

  	removeFormation(i: number) {
    	(<FormArray>this.formationForm.get('formations')).removeAt(i);
  	}

	get formations() {
    	return this.formationForm.get('formations') as FormArray;
  	}
  	private convertisseur(fg: FormGroup): CursusScolaire[] {
      const formations = fg.value['formations'];
      let cursus: CursusScolaire[] = [];
      for(let i=0; i<formations.length; i++){
        cursus.push(new CursusScolaire(
          formations[i].id,
          formations[i].version,
          formations[i].date,
          formations[i].etablissement,
          formations[i].diplome,
          formations[i].formation,
          formations[i].membre
          ));
      }
    const cursusScol = new CursusScolaire(
      fg.value['formations']
    );
    return cursus;
  }
}
