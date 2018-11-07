import { Component, OnInit, Inject } from '@angular/core';
import {LoginService} from '../../core/services/personne/membre/login.service';
import {RegisterService} from '../../core/services/personne/membre/register.service';
import {LoginsocialService} from '../../core/services/personne/membre/loginsocial.service';
import {AuthFirebaseService} from '../../firebaseDir/auth-firebase.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {InfoMembreService} from '../../core/services/info-membre/info-membre.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login: any;
  public password: any;

  constructor(public loginS: LoginService, public reg: RegisterService,
   public authFirebaseService: AuthFirebaseService, public loginsocialService : LoginsocialService, private InfoM: InfoMembreService, private router: Router) {
		// alert(new Date());
  }

  ngOnInit() {
  }

  AuthS() {
  let u = this;
    const data: any = {login: this.login, password: this.password, repassword: this.password, type: 'ME'};
    const url = this.reg.urlLogins();
    this.loginS.Authentification(url, data)    .subscribe((resul) => {
        if (resul.status === 200) {
		u.firbaselogin().then(() => {

        // console.log(resul.headers.get('Authorization'));
		localStorage.setItem('togetToken', resul.headers.get('Authorization'));
		   localStorage.setItem('log', data.login);
		   this.InfoM.localstor();
        this.router.navigate(['/admin']);
      },

      (error) => {

        console.log('error Authentification firebase');

      }

    );  
        } else {
          console.log('Authentification incorrecte!');
        }
      },
      err => {
            console.log('Error: ' + err);
      });
  }
  
  firbaselogin(): any{
   return  this.authFirebaseService.signInUser(this.login, this.password); 
	}
		SocialLogin(data){
			
			this.loginsocialService.socialsignin(data);
			
			}

	showhide(param, param2){
		$("."+param).hide();
		$("."+param2).fadeIn();
	}
	
	inscript(){
		this.router.navigate(['/register']);
	}
}
