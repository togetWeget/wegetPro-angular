import {
  Component, OnInit, ViewChild,
  ElementRef, Input
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


@Component({
  selector: 'app-info-perso',
  templateUrl: './info-perso.component.html',
  styleUrls: ['./info-perso.component.scss']
})
export class InfoPersoComponent implements OnInit {
  @ViewChild('photo') photo: ElementRef;
  membre = new Membre();
  cv: CvPersonne;
  defaultProfil: any = '/assets/placeholder-image.jpg';
  detailsForm: FormGroup;
  detailblock: Detailblock;
  detailblocks: Detailblock[];
  static me: InfoPersoComponent;
  titres = [
    {libelle: 'Mlle', name: 'Mlle'},
    {libelle: 'Mme', name: 'Mme'},
    {libelle: 'Mr', name: 'Mr'}
  ];
  typeTelephones = [
    {libelle: 'mobile', name: 'mobile'},
    {libelle: 'bureau', name: 'bureau'},
    {libelle: 'domicile', name: 'domicile'}
  ];

  constructor(private fb: FormBuilder,
              private membreService: MembreService,
              public outils: OutilsService) {
    InfoPersoComponent.me = this;
   // this.getDetailBlock();

  }

  ngOnInit() {
    this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    this.photo.nativeElement.style.backgroundSize = 'cover';
    this.photo.nativeElement.style.backgroundPosition = 'center';

    this.membreService.getMembreByLogin(localStorage.getItem('log'))
      .subscribe(res => {
        this.membre = res.body;
        if (res.status === 0) {
          this.initForm();
        }

        this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
      });
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

  removeTephone(i: number) {
    (<FormArray>this.detailsForm.get('telephones')).removeAt(i);
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

      adresse: this.fb.group({
        codePostal: [this.membre.adresse.boitePostal],
        email: [this.membre.adresse.email],
        pays: [this.membre.adresse.pays],
        ville: [this.membre.adresse.ville],
        quartier: [this.membre.adresse.quartier]
      }),
      login: [{value: this.membre.login}],

      cvPersonne: this.fb.group({
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

      }),
      telephones: telephonesInit,
      langues: langueInit,
      typeStatut: this.fb.group({
        id: [this.membre.typeStatut.id],
        version: [this.membre.typeStatut.version],
        libelle: [this.membre.typeStatut.libelle]
      }),
      contrat: this.fb.group({
        id: [this.membre.contrat.id],
        version: [this.membre.contrat.version],
        dureeContrat: [this.membre.contrat.dureeContrat],
        periodeContrat: [this.membre.contrat],
      }),
      description: [{value: this.membre.description}]
    });
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
    console.log(this.detailsForm.value);
    let mensModif: Membre;
    mensModif = this.convertisseur(this.detailsForm);
    this.membreService.modifierMembre(mensModif)
      .subscribe(res => {
        console.log('MODIFIER MEMBRE SUCCESS', res);
      });
  }

  private convertisseur(fg: FormGroup): Membre {
    const mens = new Membre(
      fg.value['id'],
      fg.value['version'],
      fg.value['cni'],
      fg.value['titre'],
      fg.value['nom'],
      fg.value['prenom'],
      fg.value['password'],
      fg.value['repassword'],
      fg.value['actived'],
      fg.value['nomComplet'],
      fg.value['pathPhoto'],
      fg.value['nombreVue'],
      fg.value['groupeSanguin'],
      fg.value['dateNaissance'],
      fg.value['genre'],
      'ME',
      fg.value['adresse'],
      fg.value['login'],
      fg.value['entreprise'],
      fg.value['cvPersonne'],
      fg.value['telephone'],
      fg.value['langues'],
      fg.value['typeStatut'],
      fg.value['contrat'],
      fg.value['description'],
    );
    return mens;
  }
}
