import { Component, OnInit, Inject } from '@angular/core';
import {LoginService} from '../../core/services/personne/membre/login.service';
import {RegisterService} from '../../core/services/personne/membre/register.service';
import {LoginsocialService} from '../../core/services/personne/membre/loginsocial.service';
import {AuthFirebaseService} from '../../firebaseDir/auth-firebase.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: any;
  public password: any;

  constructor(public loginS: LoginService, public reg: RegisterService,
   public authFirebaseService: AuthFirebaseService, public loginsocialService : LoginsocialService) {
		// alert(new Date());
  }

  ngOnInit() {
  }

  AuthS() {
    const data: any = {login: this.login, password: this.password, repassword: this.password, type: 'ME'};
    const url = this.reg.urlLogins();
    this.loginS.Authentification(url, data);
    this.authFirebaseService.signInUser(this.login, this.password).then(

      () => {

        alert('OK Authentification firebase');

      },

      (error) => {

        alert('error Authentification firebase');

      }

    );
  }
		SocialLogin(data){
			
			this.loginsocialService.socialsignin(data);
			
			}


}
