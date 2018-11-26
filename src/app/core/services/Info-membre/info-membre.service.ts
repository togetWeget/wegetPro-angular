import { Injectable } from '@angular/core';
import { OutilsService } from '../outils.service';
// import {RegisterService} from '../personne/membre/register.service';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class InfoMembreService {
	private urlgetbyLogin = `${this.outils.getBaseUrl()}/membresLogin/`;
	public InfoMembres: any = {};
<<<<<<< HEAD
	public nomComplet: any;
	public photoProfil: any;
=======
>>>>>>> develop
	constructor(private outils: OutilsService) { 
	  // this.getByLogin();
	  // alert(this.InfoMembres);
	  }
  // base64_encode( str ): any {
		// let chr =  window.btoa(unescape(encodeURIComponent( str )));
		// console.log(chr);
	// }

	// base64_decode( str ): any {
	  // let chr = decodeURIComponent(escape(window.atob( str )));
	  // console.log(chr);
	// }
  
    getbylogin(){
    	try{
			this.localstor();
			if(localStorage.getItem("membre")){
			let chr = decodeURIComponent(escape(window.atob( localStorage.getItem("membre") )));
			this.InfoMembres = JSON.parse(chr);
				}
		}catch(e){
			console.error('getbylogin error', e);
		}
	}  
  	
	localstor(): any{
		const strValue: string = localStorage.getItem('log');
          
	    if(strValue){
	        let u = this;       
	    $.getJSON( u.urlgetbyLogin + strValue, function( data ) {
		let chr =  window.btoa(unescape(encodeURIComponent( JSON.stringify(data.body) )));
			localStorage.setItem("membre",chr );
			});
		}
	}
}
