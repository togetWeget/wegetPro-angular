import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {AuthGuardTogetService} from '../../core/services/AuthGuards/auth-guard-toget.service';

import * as firebase from 'firebase';
import {AuthFirebaseService} from '../../firebaseDir/auth-firebase.service';
import {LoginService} from '../../core/services/personne/membre/login.service';
import {RequestChatroomService} from '../../core/services/Request-Chatroom/request-chatroom.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger('menuShow', [
      state('open', style({
        transform: 'rotateX(0deg)'
      })),
      state('close', style({
        transform: 'rotateX(90deg)'
      })),
      transition('open => close', animate('100ms ease-in')),
      transition('close => open', animate('100ms ease-out'))
    ])
  ]

})
export class ToolbarComponent implements OnInit {
  @Input() toggle_btn: any;
  modal_toggle = 0;
  menu_state: string;
  stor: boolean;
  public isAuth: boolean;

  constructor(public requestChatroomService: RequestChatroomService, private router: Router, private dialog: MatDialog, public authFirebaseService: AuthFirebaseService, private loginService: LoginService) {

  }

  ngOnInit() {
    this.menu_state = 'close';
    this.getLocalstorage();

    firebase.auth().onAuthStateChanged(
      (user) => {

        if (user) {

          this.isAuth = true;

        } else {

          this.isAuth = false;

        }

      }
    );
  }


  onSignOut() {
    this.loginService.DestroyLocal();
    this.authFirebaseService.signOutUser();
  }


  toggleModal() {
    const tok = localStorage.getItem('togetToken');
    if (!tok) {
      this.modal_toggle = this.modal_toggle + 1;
    }
  }

  getLocalstorage() {
    setInterval(() => {
      const tok = localStorage.getItem('togetToken');
      if (tok) {
        this.stor = false;
      } else {
        this.stor = true;
      }
    }, 1000);
  }

  toggleMenu() {
    this.menu_state = (this.menu_state === 'close') ? 'open' : 'close';
  }

  connexion() {
    this.router.navigate(['/admin']);
  }

  inscription() {
    this.router.navigate(['/register']);
  }

}
