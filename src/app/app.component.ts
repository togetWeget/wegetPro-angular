import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {ConnexionUpService} from './core/services/connexionUp/connexion-up.service';
import * as firebase from 'firebase/app';
import {ChatCliComponent} from './site/chat-cli/chat-cli.component';
import {ChatLiasonService} from './core/services/chat-liason/chat-liason.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
<<<<<<< HEAD
  @ViewChild('chat') public chat: ChatCliComponent;
  public changechat: boolean;
  public msgbool = false;
  constructor (private router: Router, public connexionup: ConnexionUpService, public chatl: ChatLiasonService) {
=======
  constructor (private router: Router, public connexionup: ConnexionUpService) {
>>>>>>> develop
  	const config = {
      apiKey: 'AIzaSyBcBo2iHpfSO3CzwTXdICgV2VX_erq_sKg',
      authDomain: 'toget-2b431.firebaseapp.com',
      databaseURL: 'https://toget-2b431.firebaseio.com',
      projectId: 'toget-2b431',
      storageBucket: 'toget-2b431.appspot.com',
      messagingSenderId: '311522038007'
    };
    firebase.initializeApp(config);
<<<<<<< HEAD
	this.chatl.chatactivate = false;
=======
	
>>>>>>> develop
	// this.connexionup.sendconnexion();
  }
  
 ngOnInit() {
	 
				this.connexionup.sendconnexion();
				
				
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }

				// this.connexionup.sendconnexion();
				
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
	
	loadchat(){
		  this.chatl.globalCompt = 0;
		  this.chatl.chatactivate = true;
		  if(this.chatl.chatactivate == true){
			  this.chat.activatechat();
			  }
	}
  
    closechat(){
		  this.chatl.globalCompt = 0;
		  this.chatl.chatactivate = false;
		  if(this.chatl.chatactivate == false){
			  this.chat.desactivatechat();
			  }
	}
  
}
