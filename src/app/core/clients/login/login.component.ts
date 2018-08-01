import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/personne/membre/login.service';
import {RegisterService} from '../../services/personne/membre/register.service';


@Component({
  selector: 'app-login-content',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public login: any;
public password: any;
  constructor(public loginS: LoginService, public reg: RegisterService) {

  }

  ngOnInit() {
  }

  AuthS() {
      const data: any = {login: this.login, password: this.password, repassword: this.password, type: 'ME'};
      const url = this.reg.urlLogins();
     this.loginS.Authentification(url, data);
  }

  AuthsDestroy() {
    this.loginS.DestroyLocal();
  }

}
