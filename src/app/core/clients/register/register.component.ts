import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/personne/membre/register.service';
import {AuthFirebaseService} from '../../../firebaseDir/auth-firebase.service';

@Component({
  selector: 'app-register-content',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
public nom_c: string;
public login_ins: string;
public numero: string;
public password: string;
public repassword: string;
public type: string;
public cond_use = 0;
public error_var1: string;
public error_var2: string;
public error_var2_p: string;
public error_var3: string;
public error_var4: string;
  public error_var5: string;
  public res: any = {};
  constructor(public regist: RegisterService, public authFirebaseService: AuthFirebaseService) {

  }



  ngOnInit() {

  }

  verification(): any {
    this.nom_c = '';
    this.login_ins = '';
    this.password = '';
    this.repassword = '';

  }

  sending() {

      let rec = 0;
      if (!this.nom_c) {
        this.error_var1 = 'error';
        rec++;
      } else {
        this.error_var1 = '';

      }

      if (!this.login_ins) {
        this.error_var2 = 'error';
        rec++;
      } else {

        this.error_var2 = '';
      }

      if (!this.password) {
        this.error_var3 = 'error';
        rec++;
      } else {

        this.error_var3 = '';
      }

      if (!this.repassword || this.password !== this.repassword) {
        this.error_var4 = 'error';
        rec++;
      } else {

        this.error_var4 = '';
      }

      if (this.cond_use === 0) {
        this.error_var5 = 'error1';
        rec++;
      } else {

        this.error_var5 = '';
      }

    if (rec === 0 ) {
      const url = this.regist.urlPersonnes();
    this.type = 'ME';
      const dataObj: any = {
        nom_complet: this.nom_c,
        login: this.login_ins,
        password: this.password,
        repassword: this.repassword,
        type: this.type
      };
    console.log(url + '   /    ' + dataObj.login);
    this.res =  this.regist.registering(url, dataObj);
      this.authFirebaseService.createNewUser(this.login_ins, this.password).then(

        () => {

          alert('Ok firebase created ID');

        },

        (error) => {

          alert('Error not create firebase ID '+ error);

        }

      );
    }
  }
}
