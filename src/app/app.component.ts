import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor () {
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
}
