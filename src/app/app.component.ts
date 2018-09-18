import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor (private router: Router) {
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
  
 ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }

            let scrollToTop = window.setInterval(function () {
                let pos = window.pageYOffset;
                if (pos > 0) {
                    window.scrollTo(0, 0); // how far to scroll on each step
                } else {
                    window.clearInterval(scrollToTop);
                }
            }, 16); // how fast to scroll (this equals roughly 60 fps)
        });
    }
}
