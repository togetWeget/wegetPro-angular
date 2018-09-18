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

@Component({
  selector: 'app-cv-competence',
  templateUrl: './cv-competence.component.html',
  styleUrls: ['./cv-competence.component.scss']
})
export class CvCompetenceComponent implements OnInit {
  membre: Membre;
  cvCompetenceForm: FormGroup;
  detailblock: Detailblock;
  id: number;

  //detailblocks: Detailblock[];
  //static me: CvCompetenceComponent;

  titres =[
    {name:'salarie', libelle:'Salarié'},
    {name:'stagiaire', libelle:'Stagiaire'}
  ];
  fonctions =[
    {name:'informaticien', libelle:'Informaticien'},
    {name:'actuaire', libelle:'Actuaire'},
    {name:'professeur', libelle:'Professeur'},
    {name:'mecanicien', libelle:'Mecanicien'}
  ];
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
  disponibilite=[
    {name:'maintenant', libelle:'maintenant'},
    {name:'1_mois', libelle:'1 mois'},
    {name:'2_mois', libelle:'2 mois'},
    {name:'3_mois', libelle:'3 mois'},
    {name:'4_mois', libelle:'4 mois'},
    {name:'5_mois', libelle:'5 mois'},
    {name:'6_mois', libelle:'6 mois'},
    {name:'7_mois', libelle:'7 mois'},
    {name:'8_mois', libelle:'8 mois'},
  ];
  specialites=[
    {name:'developpeur',libelle:'Developpeur'},
    {name:'administrateur reseau',libelle:'Administrateur reseau'},
    {name:'remorquage',libelle:'Remorquage'},
    {name:'maintenance',libelle:'Maintenance'}
  ];
  contrats=[
    {name:'cdd',libelle:'CDD'},
    {name:'cdi',libelle:'CDI'},
    {name:'indetermine',libelle:'Indeterminé'},
  ];
  dureeContrats=[
    {name:'1 mois',libelle:'1 mois'},
    {name:'3 mois',libelle:'3 mois'},
    {name:'6 mois',libelle:'6 mois'},
    {name:'12 mois',libelle:'12 mois'},
    {name:'peu importe',libelle:'Peu importe'}
  ];

  constructor(private fb: FormBuilder, 
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
      if (res.status===0) {
           this.initForm();
         }   

    });   
    //this.initForm();
  }

  initForm() {
    if(this.membre.cvPersonne === null){
      this.membre.cvPersonne = new CvPersonne(null, 0);
    }

    this.cvCompetenceForm = this.fb.group({
      id: [this.membre.id],
      version: [this.membre.version],
      cvPersonne: this.fb.group({
        id: [this.membre.cvPersonne.id],
        version: [this.membre.cvPersonne.version],
        titre: [this.membre.cvPersonne.titre],
        diplome: [this.membre.cvPersonne.diplome],
        specialite: [this.membre.cvPersonne.specialite],
        anneExperience: [this.membre.cvPersonne.anneExperience],
        motivation: [this.membre.cvPersonne.motivation],
        fonctionActuelle: [this.membre.cvPersonne.fonctionActuelle],
        domaine: [this.membre.cvPersonne.domaine],
        autreSpecialite: [this.membre.cvPersonne.autreSpecialite], // autreSpecialite: autreSpecialiteInit,
        description: [this.membre.cvPersonne.description],
        pathCv: [this.membre.cvPersonne.pathCv],
        experience: [this.membre.cvPersonne.experience],
        cursus: [this.membre.cvPersonne.cursus],
        dureeContrat: [this.membre.cvPersonne.dureeContrat],
        periodeContrat: [this.membre.cvPersonne.periodeContrat],
        disponibilite: [this.membre.cvPersonne.disponibilite]
      }),
    });
    console.log('MEMBRE',this.cvCompetenceForm.value);
  }
  getDetailBlock() {
    this.abonnesService.getProfilById(this.id)
    .subscribe((data: any)=> {
      this.detailblock = data.body;     
      this.membre = this.detailblock.membre;
      this.initForm();
    });
  }


  onSubmit() {
    let memb=this.membre;
    memb=this.convertisseur(this.cvCompetenceForm);
      console.log("Formulaire envoyé PUT", memb);
      this.membreService.modifierMembre(memb)
      .subscribe(res => {
        this.getDetailBlock();
        // console.log('MODIFIER MEMBRE SUCCESS', res.body.id);
      });
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
        fg.value['cvPersonne'],
        this.detailblock.membre.description,
    );
    return mens;
  }

  handleChange() {

  }
}
