import { Component, OnInit, Inject } from '@angular/core';
import {LoginService} from '../../services/personne/membre/login.service';
import {RegisterService} from '../../services/personne/membre/register.service';
import {LoginsocialService} from '../../services/personne/membre/loginsocial.service';
import {AuthFirebaseService} from '../../../firebaseDir/auth-firebase.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {InfoMembreService} from '../../services/info-membre/info-membre.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-content',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: any;
  public password: any;
	public text_red = null;
	public text_succ = null;
  constructor(public loginS: LoginService, public reg: RegisterService,
   public authFirebaseService: AuthFirebaseService, 
   @Inject(MAT_DIALOG_DATA) public data: any, public loginsocialService : LoginsocialService,
   public dialogRef: MatDialogRef<LoginComponent>, private InfoM: InfoMembreService, private router: Router) {

  }

  ngOnInit() {
  }

 AuthS() {
 
 this.text_succ = "Chargement... , veuillez patienter";
 this.text_red = null;
  let u = this;
    const data: any = {login: this.login, password: this.password, repassword: this.password, type: 'ME'};
    const url = this.reg.urlLogins();
    this.loginS.Authentification(url, data).subscribe((resul) => {
        if (resul.status === 200) {
		u.firbaselogin().then(() => {

			// console.log(resul.headers.get('Authorization'));
			localStorage.setItem('togetToken', resul.headers.get('Authorization'));
			   localStorage.setItem('log', data.login);
			   u.InfoM.localstor();
			   u.text_succ = " succès. Redirecting...";
			   u.text_red = null;
			   u.dialogRef.close();
			// this.router.navigate(['/admin']);
		  },

		  (error) => {
			u.text_succ = null;
			u.text_red = "Erreur d'Authentification. Veuillez réessayer!";

		  }

		);  
        } else {
		u.text_succ = null;
          u.text_red = "Authentification incorrecte. login ou Mot de passe incorrecte";
        }
      },
      err => {
	  u.text_succ = null;
           u.text_red = "Authentification incorrecte. login ou Mot de passe incorrecte";
      });
  }
  
  firbaselogin(): any{
   return  this.authFirebaseService.signInUser(this.login, this.password); 
	}


	SocialLogin(data){
		
		this.loginsocialService.socialsignin(data);
		
		}
			
  AuthsDestroy() {
    this.loginS.DestroyLocal();
    this.authFirebaseService.signOutUser();
  }

}
