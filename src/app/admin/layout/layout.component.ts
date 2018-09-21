import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy,
 OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {RegisterService} from '../../core/services/personne/membre/register.service';
import {PanierService} from '../../core/services/panier.service';
import { MessagerieService } from '../../core/services/messagerie/messagerie.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {AbonnesService} from '../../core/services/abonnes/abonnes.service';
import {Detailblock} from '../../shared/models/detailblock';
import {Messagerie} from '../../shared/models/messagerie/messagerie';
import {InfoMembreService} from '../../core/services/Info-membre/info-membre.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements  OnDestroy, AfterViewInit,
OnInit {
  mobileQuery: MediaQueryList;
  @ViewChild('sidenav') sidenav: any;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;
	public InfoMembres: any = {};
	private urlgetbyLogin = 'http://wegetback:8080/membresLogin/';
	public stor = localStorage.getItem('togetToken');
  public storlog = localStorage.getItem('log');
  nonLu$: Observable<number>;
  dblk: Detailblock;
  nonLus: number = 0;
  idPersonne:number;
  messages: Messagerie[] = [];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
   public regist: RegisterService, public panierService: PanierService, public infoM: InfoMembreService,
   private messagerieService:MessagerieService, private abonneService: AbonnesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
	// this.getByLogin();
	this.infoM.getbylogin();
	console.log(this.panierService.countPanier);
	  this.nonLu$ = this.messagerieService.nonLusSubject$;
    this.nonLu$.subscribe();

    this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
      .subscribe((res:any)=> {
          this.dblk = res.body;    
        console.log(res.body);
        this.idPersonne=this.dblk[0].membre.id;
        this.fetchBlocks();
      });
  }

  getNonLus(msgs: Messagerie[]){
    let nonLus = 0;
    for(let m of msgs){
      if(m.message.statut){
        nonLus++;
      }
    }
    this.nonLus = nonLus;
    this.messagerieService.setNonLu(this.nonLus);
  }

  fetchBlocks() {
     this.messagerieService.getAllMessagesByAbonneId(+this.idPersonne)
    .subscribe(res => {
      this.messages = res.body;
       console.log('les messages recupérés', res.body);
    this.getNonLus(this.messages);
    });
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  gotoHome () {
    this.router.navigate(['/']);
  }

  ngAfterViewInit () {
    // this.sidenav.toggle();
  }
  
  
    // getByLogin(){
		// const strValue: string = localStorage.getItem('log');
          
    // if(strValue){
        // let u = this;
        // let url = u.regist.urlgetLogin;
        
      // $.getJSON( u.urlgetbyLogin + strValue, function( data ) {
 
          // u.InfoMembres = data.body;
          
			// });
		// }
		
	// }
	
		getInfopanier(){
  
		if(this.storlog && this.stor){
		
			const lhtInterval = setInterval(()=>{
			
			this.panierService.countother(this.infoM.InfoMembres.id);
			if(this.panierService.countPanier >= 0){
			// alert(this.panierService.panierdata.status);
				this.InfoMembres = this.infoM.InfoMembres;
				clearInterval(lhtInterval);

			}
			
			}, 1000);

		}
	}

  ngOnInit () {
    this.sidenav.toggle();
	this.getInfopanier();
  }
  
   
    panierredirect () {
  
	let Membre = 0;
  if(this.infoM.InfoMembres.id){
    Membre = this.infoM.InfoMembres.id;
	  }else{
	    Membre = 0;
	  }
    this.router.navigate(['site/panier/'+Membre]);
  }
  
}
