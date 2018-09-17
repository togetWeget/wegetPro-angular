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

@Component({
  selector: 'app-formation-competence',
  templateUrl: './formation-competence.component.html',
  styleUrls: ['./formation-competence.component.scss']
})
export class FormationCompetenceComponent implements OnInit {
	formationForm: FormGroup;
	cursus : CursusScolaire[]=[];
  detailblock: Detailblock;
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
       return this.abonnesService.getProfilById(+params.get('id'))
     })
    ).subscribe(res=> {
      this.detailblock = res.body;  
      this.membre = this.detailblock.membre;
      if (res.status===0) {
           this.initForm();
         }
    });
  	}

  getDetailBlock() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getAbonnesById(+params.get('id')))
    ).subscribe((data: any)=> {
      this.detailblock = data.body;     
      this.initForm();
    });
  }


  	initForm(){
  		const formationInit = new FormArray([]);
  		if (this.membre.cvPersonne.cursus.length !== 0) {
  			for (const format of this.membre.cvPersonne.cursus) {
  				formationInit.push(
	  				this.fb.group({
	  					id: format.id,
        			version: format.version,
        			date: format.date,
        			etablissement: format.etablissement,
        			diplome: format.diplome,
              formation: format.formation,
              membre: this.membre,
        			description: format.description,
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
      let memb=this.membre;
      memb=this.convertisseur(this.formationForm);
      console.log("Formulaire envoyé PUT", memb);
      this.membreService.modifierMembre(memb)
      .subscribe(res => {
        console.log('MODIFIER MEMBRE SUCCESS', res.body.id);
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
            membre: [this.membre],
        		description: [''],
			})
    	);
    	
  	}

  	removeFormation(i: number) {
    	(<FormArray>this.formationForm.get('formations')).removeAt(i);
  	}

	get formations() {
    	return this.formationForm.get('formations') as FormArray;
  	}

  	private convertisseur(fg: FormGroup): Membre {
      const mens = new Membre(
        this.detailblock.membre.id,
        this.detailblock.membre.version,
        this.detailblock.membre.cni,
        this.detailblock.membre.titre,
        this.detailblock.membre.nom,
        this.detailblock.membre.prenom,
        null,
        null,
        false,
        this.detailblock.membre.nomComplet,
        this.detailblock.membre.pathPhoto,
        this.detailblock.membre.pathPhotoCouveture,
        this.detailblock.membre.nombreVue,
        this.detailblock.membre.groupSanguin,
        this.detailblock.membre.dateNaissance,
        this.detailblock.membre.genre,
        'ME',
        this.detailblock.membre.adresse,
        this.detailblock.membre.login,
        this.detailblock.membre.entreprise,
        this.detailblock.membre.telephones,
        this.detailblock.membre.langues,
        this.detailblock.membre.typeStatut,   
        this.detailblock.membre.couleur,
        new CvPersonne(
          this.detailblock.membre.cvPersonne.id,
          this.detailblock.membre.cvPersonne.version,
          this.detailblock.membre.cvPersonne.titre,
          this.detailblock.membre.cvPersonne.diplome,
          this.detailblock.membre.cvPersonne.specialite,
          this.detailblock.membre.cvPersonne.anneExperience,
          this.detailblock.membre.cvPersonne.motivation,
          this.detailblock.membre.cvPersonne.fonctionActuelle,
          this.detailblock.membre.cvPersonne.domaine,
          this.detailblock.membre.cvPersonne.autreSpecialite,
          this.detailblock.membre.cvPersonne.description,
          this.detailblock.membre.cvPersonne.pathCv,
          this.detailblock.membre.cvPersonne.experience,
          fg.value['formations'],
          this.detailblock.membre.cvPersonne.dureeContrat,
          this.detailblock.membre.cvPersonne.periodeContrat,
          this.detailblock.membre.cvPersonne.disponibilite,
          ),
        this.detailblock.membre.description,
    );
    return mens;
  }
}
