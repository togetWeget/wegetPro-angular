import { Component, OnInit, ViewChild,
	ElementRef, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,
Validators } from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {OutilsService} from '../../../core/services/outils.service';

@Component({
  selector: 'app-cv-competence',
  templateUrl: './cv-competence.component.html',
  styleUrls: ['./cv-competence.component.scss']
})
export class CvCompetenceComponent implements OnInit {
  membre = new Membre();
  cvCompetenceForm: FormGroup;
  detailblock: Detailblock;
  //detailblocks: Detailblock[];
  static me: CvCompetenceComponent;

  titres =[
    {libelle:'salarie', name:'Salarié'},
    {libelle:'stagiaire', name:'Stagiaire'}
  ];
  fonctions =[
    {libelle:'informaticien', name:'Informaticien'},
    {libelle:'actuaire', name:'Actuaire'},
    {libelle:'professeur', name:'Professeur'},
    {libelle:'mecanicien', name:'Mecanicien'}
  ];
  domaines =[
    {libelle:'informatique', name:'Informatique'},
    {libelle:'banque', name:'Banque'},
    {libelle:'finance', name:'Finance'},
    {libelle:'mecanique', name:'Mecanique'}
  ];
  diplomes=[
    {libelle:'CEPE', name:'CEPE'},
    {libelle:'BEPC', name:'BEPC'},
    {libelle:'CAP', name:'CAP'},
    {libelle:'BEP', name:'BEP'},
    {libelle:'BAC', name:'BAC'},
    {libelle:'BTS', name:'BTS'},
    {libelle:'DUT', name:'DUT'},
    {libelle:'DEUG', name:'DEUG'},
    {libelle:'LICENCE', name:'LICENCE'},
    {libelle:'MAITRISE', name:'MAITRISE'}
  ];
  specialites=[
    {libelle:'developpeur',name:'Developpeur'},
    {libelle:'administrateur reseau',name:'Administrateur reseau'},
    {libelle:'remorquage',name:'Remorquage'},
    {libelle:'maintenance',name:'Maintenance'}
  ];
  contrats=[
    {libelle:'cdd',name:'CDD'},
    {libelle:'cdi',name:'CDI'},
    {libelle:'indetermine',name:'Indeterminé'},
  ];
  dureeContrats=[
    {libelle:'1 mois',name:'1 mois'},
    {libelle:'3 mois',name:'3 mois'},
    {libelle:'6 mois',name:'6 mois'},
    {libelle:'12 mois',name:'12 mois'},
    {libelle:'peu importe',name:'Peu importe'}
  ];

  constructor(private fb: FormBuilder, 
    private membreService: MembreService, 
    private abonnesService: AbonnesService,
    public outils: OutilsService,
    private route: ActivatedRoute) {
   // CvCompetenceComponent.me = this;
  }

  ngOnInit() { 
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getProfilById(+params.get('id')))
    ).subscribe(res=> {
      this.detailblock = res.body;  
      if (res.status===0) {
           this.initForm();
         }   

    });   
    //this.initForm();
  }

  initForm() {
    this.cvCompetenceForm = this.fb.group({
      id: [this.detailblock.personne.id],
      version: [this.detailblock.personne.version],
      cvPersonne: this.fb.group({
        id: [this.detailblock.personne.cvPersonne.id],
        version: [this.detailblock.personne.cvPersonne.version],
        titre: [this.detailblock.personne.cvPersonne.titre],
        diplome: [this.detailblock.personne.cvPersonne.diplome],
        specialite: [this.detailblock.personne.cvPersonne.specialite],
        anneExperience: [this.detailblock.personne.cvPersonne.anneExperience],
        motivation: [this.detailblock.personne.cvPersonne.motivation],
        fonctionActuelle: [this.detailblock.personne.cvPersonne.fonctionActuelle],
        domaine: [this.detailblock.personne.cvPersonne.domaine],
        autreSpecialite: [this.detailblock.personne.cvPersonne.autreSpecialite],
        description: [this.detailblock.personne.cvPersonne.description],
        pathCv: [this.detailblock.personne.cvPersonne.pathCv],

      }),
      contrat: this.fb.group({
        id: [this.detailblock.personne.contrat.id],
        version: [this.detailblock.personne.contrat.version],
        dureeContrat: [this.detailblock.personne.contrat.dureeContrat],
        periodeContrat: [this.detailblock.personne.contrat],
      }),
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

  updateCurriculumVitea() {
    let dblk:Detailblock;
    dblk=this.convertisseur(this.cvCompetenceForm);
    this.membreService.modifierMembre(dblk.personne)
    .subscribe(res => {
      console.log('MODIFIER MEMBRE SUCCESS', res.body);
    });
  }

  private convertisseur(fg: FormGroup): Membre {
    const mens = new Membre(
      fg.value['id'],
      fg.value['version'],
     null,
      null,
      null,
      null,
     null,
      null,
      false,
      null,
      null,
      null,
      null,
      null,
      null,
      'ME',
      null,
      null,
      null,
      fg.value['cvPersonne'],
      null,
      null,
      null,
      fg.value['contrat'],
      null,
    );
    return mens;
  }
}
