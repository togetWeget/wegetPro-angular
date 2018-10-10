import { Component, OnInit, ViewChild,
  ElementRef, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,
Validators,FormArray } from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {OutilsService} from '../../../core/services/outils.service';
import {CvPersonne} from '../../../shared/models/personne/cv-personne';
import {CursusScolaire} from '../../../shared/models/personne/cv-personne/cursusScolaire';
import {CompetenceService} from '../../../core/services/competence.service';
import { Experience } from '../../../shared/models/personne/cv-personne/experience';

@Component({
  selector: 'app-experience-competence',
  templateUrl: './experience-competence.component.html',
  styleUrls: ['./experience-competence.component.scss']
})
export class ExperienceCompetenceComponent implements OnInit {
	experienceForm: FormGroup;
  detailblock: Detailblock;
  membre : Membre;
  id: number;
	experience : Experience[]=[];

	constructor(private fb: FormBuilder, 
    private competenceService: CompetenceService,
    private membreService: MembreService, 
    private abonnesService: AbonnesService,
    public outils: OutilsService,
    private route: ActivatedRoute) {
    this.membre = new Membre();
   // CvCompetenceComponent.me = this;
  }

  ngOnInit() {
    this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>{
      this.id = +params.get('id');
     return this.abonnesService.getProfilById(this.id)
   })
  ).subscribe(res=> {
    this.detailblock = res.body;  
    this.membre = this.detailblock.membre;
    // this.getDetailBlock();
    if (res.status===0) {
         this.initForm();
       }
  });
  }


  initForm(){

  		const experienceInit = new FormArray([]);
      try{
        if (this.membre.cvPersonne.experience.length !== 0) {
    			for (const exp of this.membre.cvPersonne.experience) {
    				experienceInit.push(
  	  				this.fb.group({
  	  					id: [exp.id],
  	        			version: [exp.version],
  	        			entreprise: [exp.entreprise],
  	        			postOccupe: [exp.postOccupe],
  	        			dateDebut: [exp.dateDebut],
  	        			dateFin: [exp.dateFin],
  	        			tache: [exp.tache],
  	        			lieu: [exp.lieu]
  	        		})
          		);
    			}
    		}
      }catch(e){
        console.error('initForm', e);
      }
  		this.experienceForm = this.fb.group({
  				experiences:experienceInit,
  			}
  		)
  	}


  getDetailBlock() {
    this.abonnesService.getProfilById(this.id)
    .subscribe((data: any)=> {
      this.detailblock = data.body;     
      this.membre = this.detailblock.membre;
      this.initForm();
    });
  }


  	onSubmit(){
      let memb=this.membre;
      memb=this.convertisseur(this.experienceForm);
      // console.log("Formulaire envoyé PUT", memb);
      this.membreService.modifierMembre(memb)
      .subscribe(res => {
        this.getDetailBlock();
        // console.log('MODIFIER MEMBRE SUCCESS', res.body.id);
      });
    }

private convertisseur(fg: FormGroup): Membre {
      const mens = new Membre(
        this.membre.id,
        this.membre.version,
        this.membre.cni,
        this.membre.titre,
        this.membre.nom,
        this.membre.prenom,
        null,
        null,
        false,
        this.membre.nomComplet,
        this.membre.pathPhoto,
        this.membre.pathPhotoCouveture,
        this.membre.nombreVue,
        this.membre.groupSanguin,
        this.membre.dateNaissance,
        this.membre.genre,
        'ME',
        this.membre.adresse,
        this.membre.login,
        this.membre.entreprise,
        this.membre.telephones,
        this.membre.langues,
        this.membre.typeStatut,   
        this.membre.couleur,
        new CvPersonne(
          this.membre.cvPersonne.id,
          this.membre.cvPersonne.version,
          this.membre.cvPersonne.titre,
          this.membre.cvPersonne.diplome,
          this.membre.cvPersonne.specialite,
          this.membre.cvPersonne.anneExperience,
          this.membre.cvPersonne.motivation,
          this.membre.cvPersonne.fonctionActuelle,
          this.membre.cvPersonne.domaine,
          this.membre.cvPersonne.autreSpecialite,
          this.membre.cvPersonne.description,
          this.membre.cvPersonne.pathCv,
          fg.value['experiences'],
          this.membre.cvPersonne.cursus,
          this.membre.cvPersonne.dureeContrat,
          this.membre.cvPersonne.periodeContrat,
          this.membre.cvPersonne.disponibilite,
          ),
        this.membre.description,
    );
    return mens;
  }

  	ajouterExperience() {   
    	this.experiences.push(
      		this.fb.group({
        		id: [null],
        		version: [0],
        		entreprise:[''],
        		postOccupe:[''],
        		dateDebut:[''],
        		dateFin:[''],
        		tache: [''],
				    lieu:['']
			})
    	);
  	}

  	removeExperience(i: number) {
    	this.experiences.removeAt(i);
  	}

	get experiences() {
    	return this.experienceForm.get('experiences') as FormArray;
  	}

}
