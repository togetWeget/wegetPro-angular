import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import {InfoMembreService} from '../info-membre/info-membre.service';
import {OutilsService} from '../outils.service';
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
	public InfoMe: any;
	public globalCompt: any = 0;
  constructor(private InfoM: InfoMembreService, private outils: OutilsService) {
	  this.photo= null;
	  this.nom= null;
	  this.id= null;
	  this.InfoM.getbylogin();
	  this.InfoMe = this.InfoM.InfoMembres;
	  }
  
	getboolean(){
	  this.chatactivate = false
	}
	geting(){
		this.InfoM.getbylogin(); 
		this.InfoMe = this.InfoM.InfoMembres;
	}
	getinfoMembre(){
			
		return $.getJSON(`${this.outils.getBaseUrl()}/typePersonnes/ME`, ( data ) => {});
		
		
		
		}
}
