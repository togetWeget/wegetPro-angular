import { Component, OnInit, ViewChild,
	ElementRef, Input } from '@angular/core';
import {
  FormBuilder, FormGroup, FormControl,
  Validators, FormArray
} from '@angular/forms';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {OutilsService} from '../../../core/services/outils.service';


@Component({
  selector: 'app-info-perso',
  templateUrl: './info-perso.component.html',
  styleUrls: ['./info-perso.component.scss']
})
export class InfoPersoComponent implements OnInit {
 @ViewChild('photo') photo: ElementRef;
  membre = new Membre();
  defaultProfil: any = '/assets/placeholder-image.jpg';
  detailsForm: FormGroup;
  detailblock: Detailblock;
  detailblocks: Detailblock[];
  static me: InfoPersoComponent;

  constructor(private fb: FormBuilder,
    private membreService: MembreService,
    public outils: OutilsService) {
    InfoPersoComponent.me = this;
  }

  ngOnInit() {
    this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    this.photo.nativeElement.style.backgroundSize = 'cover';
    this.photo.nativeElement.style.backgroundPosition = 'center';
    this.getDetailBlock();
    this.initForm();
  }

  getProfilSrc(): any {
    return (this.membre.pathPhoto !== null &&
      this.membre.pathPhoto !== undefined &&
      this.membre.pathPhoto !== '') ?
    this.membre.pathPhoto :
    this.defaultProfil;
  }

  initForm() {

     const telephonesInit = new FormArray([]);
    let mens: Membre;

        mens = this.membre;
        if (mens.telephones.length !== 0) {
          for (const tel of mens.telephones) {
            telephonesInit.push(
              this.fb.group({
                type: tel.type,
                numero: tel.numero,
                version: tel.version,
                id: tel.id
              })
            );
          }
        }


    this.detailsForm = this.fb.group({
      id: [{value: this.membre.id}],
      version: [{value: this.membre.version}],
      cni: [{value: this.membre.cni}],
       titre: [{value: this.membre.titre}],
       nom: [{value: this.membre.nom, disabled: false}],
      prenom: [{value: this.membre.prenom, disabled: false}],
      password: [{value: this.membre.password}],
      repassword: [{value: this.membre.repassword}],
      actived: [{value: this.membre.actived}],
      nomComplet: [{value: this.membre.nomComplet}],
      pathPhoto: [{value: this.membre.pathPhoto}],
      nombreVue: [{value: this.membre.nombreVue}],
      groupSanguin: [{value: this.membre.groupSanguin}],
       dateNaissance: [{value: this.membre.dateNaissance}],
      genre: [{value: this.membre.genre}],
      type: [{value: this.membre.type}],

       adresse:this.fb.group ({
        codePostal: [this.membre.adresse.codePostal],
        email: [this.membre.adresse.email],
        pays: [this.membre.adresse.pays]
         }),
      login: [{value: this.membre.login}],
      entreprise:this.fb.group({
        id:[this.membre.entreprise.id],
        version:[this.membre.entreprise.version],
        libelle:[this.membre.entreprise.libelle],
        description:[this.membre.entreprise.description]
        }),
      cvPersonne:this.fb.group({
       id:[this.membre.cvPersonne.id],
       version:[this.membre.cvPersonne.version],
       diplome:[this.membre.cvPersonne.diplome],
       specialite:[this.membre.cvPersonne.specialite],
       anneExperience:[this.membre.cvPersonne.anneExperience],
       description:[this.membre.cvPersonne.description],
       experience:[this.membre.cvPersonne.experience],
       cursusScolaire:[this.membre.cvPersonne.cursusScolaire],
       langue:[this.membre.cvPersonne.langue]
      }),
      telephones:telephonesInit,
      typeStatut:this.fb.group({
      id:[this.membre.typeStatut.id],
       version:[this.membre.typeStatut.version],
       libelle:[this.membre.typeStatut.libelle]
        }),
      contrat:this.fb.group({
      id:[this.membre.contrat.id],
       version:[this.membre.contrat.version],
       dureeContrat:[this.membre.contrat.dureeContrat],
       periodeContrat:[this.membre.contrat],
        }),
      description: [{value: this.membre.description}]
    });
  }

  getDetailBlock() {
    this.membreService.getMembreByLogin(localStorage.getItem('log'))
    .subscribe((data: any)=> {
      this.membre = data.body;
      this.initForm();
      this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    });
  }

  updateDetails() {
   console.log(this.detailsForm.value)
    this.membreService.modifierMembre(this.detailsForm.value)
    .subscribe((data: any) => {
      console.log('MODIFIER MEMBRE SUCCESS', data);
    });
  }
}
