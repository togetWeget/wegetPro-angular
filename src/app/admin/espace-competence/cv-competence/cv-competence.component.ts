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
  resultat:Resultat<Detailblock>;
  detailblock: Detailblock;
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
       return this.abonnesService.getProfilById(+params.get('id'))
     })
    ).subscribe(res=> {
      this.resultat = res;
      this.detailblock = res.body;  
      this.membre = this.detailblock.membre;
      if (res.status===0) {
           this.initForm();
         }   

    });   
    //this.initForm();
  }

  initForm() {
    const autreSpecialiteInit= new FormArray([]);
    const dureeContratInit= new FormArray([]);
    const periodeContratInit= new FormArray([]);
    const contratInit= new FormArray([]);

    if(this.membre !== null && this.membre.cvPersonne !== null && 
     this.membre.cvPersonne.contrat !== null && 
    this.membre.cvPersonne.contrat.length !== 0){
    let contrat = this.membre.cvPersonne.contrat;
      for(const cont of contrat){
        this.fb.group({
        id: [cont.id],
        version: [cont.version],
        dureeContrat: [cont.dureeContrat],//dureeContrat: dureeContratInit,
        periodeContrat: [cont.periodeContrat], //periodeContrat: periodeContratInit,
      });
      }
    }

    if(this.membre.cvPersonne === null){
      this.membre.cvPersonne = new CvPersonne(null, 0);
    }

    console.log('MEMBRE',this.membre);
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
        contrat: contratInit
      }),
      // contrat: this.fb.group({
      //   id: [this.membre.contrat.id],
      //   version: [this.membre.contrat.version],
      //   dureeContrat: [this.membre.contrat.dureeContrat],//dureeContrat: dureeContratInit,
      //   periodeContrat: [this.membre.contrat.periodeContrat], //periodeContrat: periodeContratInit,
      // }),
    });
  }


  get contratss (){
    // console.log("AQS", (<FormGroup>this.cvCompetenceForm.get('cvPersonne')));
    // console.log("AQ", (<FormGroup>this.cvCompetenceForm.get('cvPersonne')).get('contrat') as FormArray);
    return (<FormGroup>this.cvCompetenceForm.get('cvPersonne')).get('contrat') as FormArray;
  }

  addContrat(){
    this.contratss.push(this.fb.group({
        id: [null],
        version: [0],
        dureeContrat: [''],//dureeContrat: dureeContratInit,
        periodeContrat: [''], //periodeContrat: periodeContratInit,
      }));
  }

  removeContrat(i: number){
    this.contratss.removeAt(i);
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

  onSubmit() {
    let memb=this.membre;
    if (this.membre.cvPersonne.id === null){
      memb=this.convertisseur(this.cvCompetenceForm);
    console.log("Formulaire envoyé ", memb);
      this.membreService.ajoutMembre(memb)
      .subscribe(res => {
        console.log('MODIFIER MEMBRE SUCCESS', res.body.id);
      });
    }else{
      memb=this.convertisseur(this.cvCompetenceForm);
      console.log("Formulaire envoyé ", memb);
      this.membreService.modifierMembre(memb)
      .subscribe(res => {
        console.log('MODIFIER MEMBRE SUCCESS', res.body.id);
      });
    }
  }

  private convertisseur(fg: FormGroup): Membre {
    let mens = new Membre();
    const menss = new Membre(
        fg.value['id'],
        fg.value['version'],
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
