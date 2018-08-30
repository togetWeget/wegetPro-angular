import { Component, OnInit, ViewChild,
	ElementRef, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,
Validators } from '@angular/forms';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {OutilsService} from '../../../core/services/outils.service';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  membre = new Membre();
  detailsForm: FormGroup;
  detailblock: Detailblock;
  detailblocks: Detailblock[];
  static me: CvComponent;

  constructor(private fb: FormBuilder,
    private membreService: MembreService,
    public outils: OutilsService) {
    CvComponent.me = this;
  }

  ngOnInit() {
    this.initForm();
   // this.getDetailBlock();
  }

  initForm() {
    this.detailsForm = this.fb.group({
      id: [{value: this.membre.id}],
      version: [{value: this.membre.version}],
      nom: [{value: this.membre.nom, disabled: false}],
      prenom: [{value: this.membre.prenom, disabled: false}],
      dateNaissance: [{value: this.membre.dateNaissance}],
      genre: [{value: this.membre.genre}],
      type: [{value: this.membre.type}],
      login: [{value: this.membre.login}],
      password: [{value: this.membre.password}],
      repassword: [{value: this.membre.repassword}],
      nomComplet: [{value: this.membre.nomComplet}],
      cni: [{value: this.membre.cni}],
      titre: [{value: this.membre.titre}],
      actived: [{value: this.membre.actived}],
      pathPhoto: [{value: this.membre.pathPhoto}],
      nombreVue: [{value: this.membre.nombreVue}],
      groupSanguin: [{value: this.membre.groupSanguin}],
      adresse: this.membre.adresse,
    });
  }

 /* getDetailBlock() {
    this.membreService.getMembreByLogin(localStorage.getItem('log'))
    .subscribe((data: any)=> {
      this.membre = data.body;
      this.initForm();
      this.photo.nativeElement.style.backgroundImage = 'url(' + this.getProfilSrc() + ')';
    });
  }*/

  updateDetails() {

    this.membreService.modifierMembre(this.detailsForm.value)
    .subscribe((data: any) => {
      console.log('MODIFIER MEMBRE SUCCESS', data);
    });
  }
}
