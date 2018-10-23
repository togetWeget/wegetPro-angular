import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../core/clients/login/login.component';
import {LoginService} from '../../core/services/personne/membre/login.service';
import {PanierService} from '../../core/services/panier.service';
import {InfoMembreService} from '../../core/services/info-membre/info-membre.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as $ from 'jquery';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss', '../layout/layout.component.scss'],
  animations: [
    trigger('menuShow', [
      state('open', style({
        transform: 'rotateX(0deg)'
      })),
      state('close',   style({
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
  menu_state: boolean;
public stor = localStorage.getItem('togetToken');
public storlog = localStorage.getItem('log');
  constructor(private router: Router, private dialog: MatDialog,
    private loginService: LoginService, public paniers: PanierService, public infoM: InfoMembreService) { 
		if(this.storlog && this.stor){
			this.infoM.getbylogin();
      this.menu_state = false;
		}
		
		}
  
   ngOnInit() {
		this.getInfopanier();
	}
  
  
  
		
		
		getInfopanier(){
  
		if(this.storlog && this.stor){
		
			// const lhtInterval = setInterval(()=>{
			
			this.paniers.countother(this.infoM.InfoMembres.id);
			if(this.paniers.countPanier > 0){
			// alert(this.paniers.panierdata.status);
				// clearInterval(lhtInterval);
			}
			console.log(this.paniers.countPanier);
			// }, 1000);

		}
	}

  scrollTo (target) {
    $(document).scrollTop($(target).offset().top);
  }

  isAuthenticated () {
    let token = null;
    token = localStorage.getItem('togetToken');
    return (token === null || token === undefined) ? false : true;
  }

  toggleModal () {
    this.modal_toggle = this.modal_toggle + 1;
  }

  openModal () {
    const dialogRef = this.dialog.open(LoginComponent, {
      maxWidth: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  toggleMenu () {
    this.menu_state = !this.menu_state;
  }

  connexion () {
    this.router.navigate(['/admin']);
  }

  logout() {    
    this.loginService.DestroyLocal();
    this.router.navigate(['/']);
  }

  gotoAdmin () {
    this.router.navigate(['/admin']);
  }

  inscription () {
    this.router.navigate(['site/register']);
  }
  
  panier () {
  
	let Membre = 0;
  if(this.infoM.InfoMembres.id){
    Membre = this.infoM.InfoMembres.id;
	  }else{
	    Membre = 0;
	  }
    this.router.navigate(['site/panier/'+Membre]);
  }

}
