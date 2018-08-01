import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthGuardTogetService} from './core/services/AuthGuards/auth-guard-toget.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyBcBo2iHpfSO3CzwTXdICgV2VX_erq_sKg',
      authDomain: 'toget-2b431.firebaseapp.com',
      databaseURL: 'https://toget-2b431.firebaseio.com',
      projectId: 'toget-2b431',
      storageBucket: 'toget-2b431.appspot.com',
      messagingSenderId: '311522038007'
    };
    firebase.initializeApp(config);
  }

  title = 'app';
}
