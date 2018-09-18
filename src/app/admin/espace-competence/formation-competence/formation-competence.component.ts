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
  id: number;
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
       this.id = +params.get('id');
     return this.abonnesService.getProfilById(this.id)
     })
    ).subscribe(res=> {
      this.detailblock = res.body;  
      this.membre = this.newMembre(this.detailblock.membre);
      // this.getDetailBlock();
      if (res.status===0) {
           this.initForm();
         }
    });
  	}

  getDetailBlock() {
    this.abonnesService.getProfilById(this.id)
    .subscribe((data: any)=> {
      this.detailblock = data.body;     
      this.membre = this.newMembre(this.detailblock.membre);
      this.initForm();
    });
  }

  newMembre(mb:any){
    return new Membre(
        mb.id,
        mb.version,
        mb.cni,
        mb.titre,
        mb.nom,
        mb.prenom,
        null,
        null,
        false,
        mb.nomComplet,
        mb.pathPhoto,
        mb.pathPhotoCouveture,
        mb.nombreVue,
        mb.groupSanguin,
        mb.dateNaissance,
        mb.genre,
        'ME',
        mb.adresse,
        mb.login,
        mb.entreprise,
        mb.telephones,
        mb.langues,
        mb.typeStatut,   
        mb.couleur,
        mb.cvPersonne,
        mb.description,
    );
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
      // console.log("Formulaire envoyé PUT", memb);
      this.membreService.modifierMembre(memb)
      .subscribe(res => {
        this.getDetailBlock();
        // console.log('MODIFIER MEMBRE SUCCESS', res.body.id);
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
          this.membre.cvPersonne.experience,
          fg.value['formations'],
          this.membre.cvPersonne.dureeContrat,
          this.membre.cvPersonne.periodeContrat,
          this.membre.cvPersonne.disponibilite,
          ),
        this.membre.description,
    );
    return mens;
  }
}
