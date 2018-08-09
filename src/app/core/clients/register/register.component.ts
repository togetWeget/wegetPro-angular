import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/personne/membre/register.service';
import {FormBuilder, FormArray} from '@angular/forms';
import {AuthFirebaseService} from '../../../firebaseDir/auth-firebase.service';

@Component({
  selector: 'app-register-content',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  can_send: boolean = null;
  reponse: any;
  membreForm = this.fb.group({
    cni: [''],
    titre: [''],
    nom: [''],
    prenom: [''],
    password: [''],
    repassword: [''],
    actived: [''],
    nomComplet: [''],
    pathPhoto: [''],
    type: ['ME'],
    adresse: this.fb.group({
      codePostal: [''],
      quartier: [''],
      ville: [''],
      pays: [''],
      email: [''],
    }),
    login: [''],
    entreprise: this.fb.group({
      libelle: [''],
      description: [''],
    }),
    typeStatut: this.fb.group({
      libelle: ['']
    }),
    cvPersonnes: this.fb.group({
      diplome: [''],
      specialite: [''],
      anneExperience: [''],
      description: [''],
    }),
    telephones: this.fb.array([
      this.fb.group({
        type: [''],
        numero: [''],
      })
    ]),
    description: [''],
  });
  constructor(public regist: RegisterService, private fb: FormBuilder, 
    public authFirebaseService: AuthFirebaseService) {
    this.can_send = false;
  }

  ngOnInit() {

  }

  toggleSend () {
    this.can_send = (this.can_send === true) ? false : true;
  }

  get telephones() {
    return this.membreForm.get('telephones') as FormArray;
  }

  addTelephones() {
    this.telephones.push(this.fb.group({
      type: [''],
      numero: [''],
    }));
  }

  sending() {
    if (this.can_send) {
      const url = this.regist.urlMembres();
      console.log('post', this.membreForm.value);
      this.reponse =  this.regist.registering(url, this.membreForm.value);
      this.authFirebaseService.createNewUser(this.membreForm.value.login,
       this.membreForm.value.password).then(

        () => {

          alert('Ok firebase created ID');

        },

        (error) => {

          alert('Error not create firebase ID '+ error);

        }

      );
    } else {
      alert('Vous devez accepter les conditions de confidentialité');
    }
    }
  }
