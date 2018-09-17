import {
  Component, OnInit, ViewChild,
  ElementRef, Input, Output, EventEmitter
} from '@angular/core';
import {
  FormBuilder, FormGroup, FormControl,
  Validators, FormArray
} from '@angular/forms';
import {Detailblock} from '../../../shared/models/detailblock';
import {Resultat} from '../../../shared/models/resultat';
import {Personne} from '../../../shared/models/personne/membres/personne';
import {Membre} from '../../../shared/models/personne/membres/membre';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {OutilsService} from '../../../core/services/outils.service';
import {CvPersonne} from '../../../shared/models/personne/cv-personne';
import {Telephone} from '../../../shared/models/personne/membres/telephone';
import {Entreprise} from '../../../shared/models/personne/entreprise';
import {TypeStatut} from '../../../shared/models/personne/type-statut';
import {LangueParle} from '../../../shared/models/personne/cv-personne/langueParle';
import {Contrat} from '../../../shared/models/personne/membres/contrat';
import {Adresse} from '../../../shared/models/adresse/adresse';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-info-perso',
  templateUrl: './info-perso.component.html',
  styleUrls: ['./info-perso.component.scss']
})
export class InfoPersoComponent implements OnInit {
 @ViewChild('photo') photo: ElementRef;
 @Output('imageChanges') imageChange = new EventEmitter<string>();
  membre = new Membre();
  cv: CvPersonne;
  defaultProfil: any = '/assets/placeholder-image.jpg';
  detailsForm: FormGroup;
  detailblock: Detailblock;
  detailblocks: Detailblock[];
  static me: InfoPersoComponent;

  constructor(private fb: FormBuilder,
              private membreService: MembreService,
              public outils: OutilsService,
              private toastr: ToastrService) {
    InfoPersoComponent.me = this;
   // this.getDetailBlock();

  }

  ngOnInit() {
    //this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
   // this.photo.nativeElement.style.backgroundSize = 'cover';
    //this.photo.nativeElement.style.backgroundPosition = 'center';

    this.membreService.getMembreByLogin(localStorage.getItem('log'))
      .subscribe(res => {
        this.membre = res.body;
        if (res.status === 0) {
          this.initForm();
        }

        // this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
      });
  }

  handlImageChange(event: string){
    this.imageChange.emit(event);
  }

  getProfilSrc(): any {
    return (this.membre.pathPhoto !== null &&
      this.membre.pathPhoto !== undefined &&
      this.membre.pathPhoto !== '') ?
      this.membre.pathPhoto :
      this.defaultProfil;
  }

  ajouTelephone() {   
    (<FormArray>this.detailsForm.get('telephones')).push(
      this.fb.group({
        id: [null],
        version: [0],
        type: [''],
        numero: ['']

      })
    );
  }

  ajoutLangue() {   
    (<FormArray>this.detailsForm.get('langues')).push(
      this.fb.group({
        id: [null],
        version: [0],
        libelle: [''],
        description: ['']

      })
    );
  }

  removeTephone(i: number) {
    (<FormArray>this.detailsForm.get('telephones')).removeAt(i);
  }

  removeLangue(i: number) {
    (<FormArray>this.detailsForm.get('langues')).removeAt(i);
  }

  initForm() {

    const telephonesInit = new FormArray([]);
    const langueInit = new FormArray([]);
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


    if (mens.langues.length !== 0) {
      for (const lang of mens.langues) {
        langueInit.push(
          this.fb.group({
            libelle: lang.libelle,
            description: lang.decription,
            version: lang.version,
            id: lang.id
          })
        );
      }
    }

    this.detailsForm = this.fb.group({
      id: [this.membre.id],
      version: [this.membre.version],
      cni: [ this.membre.cni],
      titre: [ this.membre.titre],
      nom: [{value: this.membre.nom, disabled:false}],
      prenom: [{value: this.membre.prenom, disabled: false}],
      password: [ this.membre.password],
      repassword: [ this.membre.repassword],
      actived: [ this.membre.actived],
      nomComplet: [ this.membre.nomComplet],
      pathPhoto: [ this.membre.pathPhoto],
      nombreVue: [ this.membre.nombreVue],
      groupSanguin: [ this.membre.groupSanguin],
      dateNaissance: [ this.membre.dateNaissance],
      genre: [this.membre.genre],
      type: [this.membre.type],

      adresse: this.fb.group({
        boitePostal: [this.membre.adresse.boitePostal],
        email: [this.membre.adresse.email],
        pays: [this.membre.adresse.pays],
        ville: [this.membre.adresse.ville],
        quartier: [this.membre.adresse.quartier]
      }),
      login: [this.membre.login],

      /*cvPersonne: this.fb.group({
        id: [this.membre.cvPersonne.id],
        version: [this.membre.cvPersonne.version],
        diplome: [this.membre.cvPersonne.diplome],
        specialite: [this.membre.cvPersonne.specialite],
        anneExperience: [this.membre.cvPersonne.anneExperience],
        motivation: [this.membre.cvPersonne.motivation],
        fonctionActuelle: [this.membre.cvPersonne.fonctionActuelle],
        domaine: [this.membre.cvPersonne.domaine],
        autreSpecialite: [this.membre.cvPersonne.autreSpecialite],
        description: [this.membre.cvPersonne.description],
        pathCv: [this.membre.cvPersonne.pathCv],

      }),*/
     telephones: telephonesInit,
      langues: langueInit,
      /*typeStatut: this.fb.group({
       /*id: [this.membre.typeStatut.id],
        version: [this.membre.typeStatut.version],
        libelle: [this.membre.typeStatut.libelle]
      }),
      contrat: this.fb.group({
        id: [this.membre.contrat.id],
        version: [this.membre.contrat.version],
        dureeContrat: [this.membre.contrat.dureeContrat],
        periodeContrat: [this.membre.contrat],
      }),*/
      //description: [{value: this.membre.description}]
    });
  }

  get telephones() {
    return this.detailsForm.get('telephones') as FormArray;
  }
  get langues() {
    return this.detailsForm.get('langues') as FormArray;
  }

  getDetailBlock() {
    this.membreService.getMembreByLogin(localStorage.getItem('log'))
      .subscribe(res => {
        this.membre = res.body;
        if (res.status === 0) {
          this.initForm();
        }

        this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
      });
  }

  onSubmit() {

    let mensModif: Membre;
    mensModif = this.convertisseur(this.detailsForm);
    console.log(mensModif);
    this.membreService.modifierMembre(mensModif)
      .subscribe(res => {
        this.membre = res.body;
        console.log('MODIFIER MEMBRE SUCCESS', res.body.nomComplet);
      });
  }

  private convertisseur(fg: FormGroup): Membre {
    const mens = new Membre(
        // fg.value['id'],
        // fg.value['version'],
        this.membre.id,
        this.membre.version,
        this.membre.cni,
        this.membre.titre,
        fg.value['nom'],
        fg.value['prenom'],
        null,
        null,
        false,
        this.membre.nomComplet,
        this.membre.pathPhoto,
        this.membre.pathPhotoCouveture,
        this.membre.nombreVue,
        this.membre.groupSanguin,
        this.membre.dateNaissance,
        fg.value['genre'],
        'ME',
         fg.value['adresse'],
        this.membre.login,
        this.membre.entreprise,
        fg.value['telephones'],
        fg.value['langues'],
        this.membre.typeStatut,   
        this.membre.couleur,
        this.membre.cvPersonne,
        this.membre.description,
    );
    return mens;
  }
}
