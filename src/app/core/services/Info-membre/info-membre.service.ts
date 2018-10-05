import { Injectable } from '@angular/core';
import {RegisterService} from '../personne/membre/register.service';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class InfoMembreService {
	private urlgetbyLogin = 'http://wegetback:8080/membresLogin/';
	public InfoMembres: any = {};
  constructor( public regist: RegisterService) { 
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
			let chr = decodeURIComponent(escape(window.atob( localStorage.getItem("membre") )));
			this.InfoMembres = JSON.parse(chr);
		}catch(e){
			console.error('getbylogin error', e);
		}
	}  
  	
	localstor(): any{
		const strValue: string = localStorage.getItem('log');
          
	    if(strValue){
	        let u = this;
	        let url = u.regist.urlgetLogin;	        
	    $.getJSON( u.urlgetbyLogin + strValue, function( data ) {
		let chr =  window.btoa(unescape(encodeURIComponent( JSON.stringify(data.body) )));
			localStorage.setItem("membre",chr );
			});
		}
	}
}
