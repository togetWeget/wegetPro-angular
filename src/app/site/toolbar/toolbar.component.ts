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
import {AbonnesService} from '../../core/services/abonnes/abonnes.service';


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
  photoProfil:string;
  isVisible:boolean=false;
  nomComplet: string;
public stor = localStorage.getItem('togetToken');
public storlog = localStorage.getItem('log');
public prix = 0;
public load: number;

  constructor(private router: Router, private dialog: MatDialog,
    private loginService: LoginService, public paniers: PanierService, public infoM: InfoMembreService,private abonneService:AbonnesService) { 
		if(this.storlog && this.stor){
			this.infoM.getbylogin();
      this.menu_state = false;
	  this.load =  1;
		}
		
		}
  
   ngOnInit() {
	   this.paniers.panierId = [];
	   this.load =  1;
 
      if(this.infoM.InfoMembres){
		  this.getpa();
		  this.getallP();
		// console.log(this.paniers.panierId);
				this.infoM.photoProfil = this.infoM.InfoMembres.pathPhoto;
		
				if(this.infoM.InfoMembres.nomComplet){
				let name = this.infoM.InfoMembres.nomComplet.split(" ");
				if(name.length >= 2){
					this.infoM.nomComplet = name[0]+" "+name[1];
				}else{
					this.infoM.nomComplet = this.infoM.InfoMembres.nomComplet;
				}
		}
      }else{
        this.infoM.photoProfil='';
		this.infoM.nomComplet='';
      }
    
	}
	
	getallP(){
			let u = this;
			let verif =0;
		this.paniers.getPanierIdReturn(this.infoM.InfoMembres.id)
						.done((data)=> {
							verif = 1;
						}).fail((data)=> {
							verif = 0;						
						}).always((data)=> {
							if(verif == 1){
								u.load =  2;
							}else{
								u.load =  3;	
							}		
						});	
		
	}
	getpa(){
					
		      
				this.paniers.paniereload(this.infoM.InfoMembres.id);
			
						
			
	}
  	calculprix(){
		if(this.paniers.panierId){
		this.prix = 0;
			for(let i=0; i<this.paniers.panierId.length; i++ ){
					this.prix += parseInt(this.paniers.panierId[i].montant);
					this.paniers.Total = this.prix;
				}

			}

	}
  
	calculdate(){
		
		if(this.paniers.panierId){
				for(let i=0; i<this.paniers.panierId.length; i++ ){
					let dateLocal = this.paniers.panierId[i].date;
					this.paniers.panierId[i].date = new Date(dateLocal).toLocaleString();
				}

			}
	}	
		
		getInfopanier(){
  
		// if(this.storlog && this.stor){
		
			// const lhtInterval = setInterval(()=>{
			
			// this.paniers.countother(this.infoM.InfoMembres.id);
			// if(this.paniers.countPanier > 0){
			// alert(this.paniers.panierdata.status);
				// clearInterval(lhtInterval);
			// }
			// console.log(this.paniers.countPanier);
			// }, 1000);

		// }
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
      // console.log('The dialog was closed');
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
    // this.router.navigate(['/']);
	window.location.reload(true);
  }

  gotoAdmin () {
    this.router.navigate(['/admin']);
  }

  inscription () {
    this.router.navigate(['/register']);
  }

  login () {
    this.router.navigate(['/login']);
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

  onProfil(){
    if(this.isVisible){
      this.isVisible=false;
    }
    else{
      this.isVisible=true;
    }
    //console.log(this.isVisible);
  }
  goProfil(){
    this.router.navigate(['/admin/compte'])
  }

}
