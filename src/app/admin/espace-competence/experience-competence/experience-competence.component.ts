import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { Experience } from '../../../shared/models/personne/cv-personne/experience';

@Component({
  selector: 'app-experience-competence',
  templateUrl: './experience-competence.component.html',
  styleUrls: ['./experience-competence.component.scss']
})
export class ExperienceCompetenceComponent implements OnInit {
	experienceForm: FormGroup;
	experience : Experience[]=[];

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.initForm();
	}
	initForm(){
  		const experienceInit = new FormArray([]);

  		if (this.experience.length !== 0) {
  			for (const exp of this.experience) {
  				experienceInit.push(
	  				this.fb.group({
	  					id: exp.id,
	        			version: exp.version,
	        			entreprise: exp.entreprise,
	        			postOccupe: exp.postOccupe,
	        			dateDebut: exp.dateDebut,
	        			dateFin: exp.dateFin,
	        			tache: exp.tache,
	        			lieu: exp.lieu,
	        			membre: exp.membre
	        		})
        		);
  			}
  		}
  		this.experienceForm = this.fb.group({
  				experiences:experienceInit,
  			}
  		)
  	}

  	onSubmit(){

  	}

  	ajouterExperience() {   
    	(<FormArray>this.experienceForm.get('experiences')).push(
      		this.fb.group({
        		id: [null],
        		version: [0],
        		entreprise:[''],
        		postOccupe:[''],
        		dateDebut:[''],
        		dateFin:[''],
        		tache: [''],
				lieu:[''],
        		membre: ['']
			})
    	);
  	}

  	removeExperience(i: number) {
    	(<FormArray>this.experienceForm.get('experiences')).removeAt(i);
  	}

	get experiences() {
    	return this.experienceForm.get('experiences') as FormArray;
  	}

}
