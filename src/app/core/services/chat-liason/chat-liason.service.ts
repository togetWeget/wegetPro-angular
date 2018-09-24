import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class ChatLiasonService {
	public chatactivate : boolean;
	public chatinfo : any = {};
	public checkchange: boolean;
	public miximaze : boolean;
	public photo: any;
	public nom: any;
	public id: any;
  constructor() {
	  // this.photo= null;
	  // this.nom= null;
	  // this.id= null;
	  // this.checkchange= false;
	  
	  }
  
	getboolean(){
	  this.chatactivate = false
	}
	  
	getinfoMembre(){
		// $.ajax({
			// url:'http://wegetback:8080/typePersonnes/ME',
			// contentType: 'application/json',
			// type:'get',
			// dataType:'json',
			// success: (data, status)=>{
				// alert(status);
				// }
			
			// ,error: (err)=>{
				
				
				// }
			// });
		
		return $.getJSON("http://wegetback:8080/typePersonnes/ME", function( data ){});
		
		
		
		}
}
