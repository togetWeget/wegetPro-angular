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
  
  
  
    getbylogin(){
		const strValue: string = localStorage.getItem('log');
          
	    if(strValue){
	        let u = this;
	        let url = u.regist.urlgetLogin;	        
	    $.getJSON( u.urlgetbyLogin + strValue, function( data ) {	 
	        u.InfoMembres = data.body;
			  // console.log(u.InfoMembres);
			});
		}	
	}
}
