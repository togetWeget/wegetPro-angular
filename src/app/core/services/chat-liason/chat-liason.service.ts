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
	
	chatload(id, nom, photo){
	this.checkchange = true;
	console.log(this.checkchange);
	  this.photo= photo;
	  this.nom= nom;
	  this.id= id;	
	  console.log(this.checkchange);
	this.loard(id);
	this.maximin();
	
	  
	}	
		maximin(){
			if(this.checkchange == false){
				this.miximaze = false;
			  $('#qnimate').removeClass('popup-box-max');
			  $('#qnimate').addClass('popup-box-min');
			  this.scrollF();	
			}			
		}
		
	scrollF(){
		try{
				const interv = setInterval( ()=> {
		  const tailleT = Math.round($('.direct-chat-messages').outerHeight(true) + $('.direct-chat-messages').scrollTop());
			  $('.direct-chat-messages').animate({'scrollTop': $('.direct-chat-messages')[0].scrollHeight});
				$('#status_message').focus();
			// alert(tailleT+" / "+$('.direct-chat-messages')[0].scrollHeight);
			if($('.direct-chat-messages')[0]){
				
			  if(tailleT >= $('.direct-chat-messages')[0].scrollHeight){
				  clearInterval(interv);
				  }
				
			}
		  },1000);
		  }catch(err){
			  console.error("erreu scroll", err.message);  
		  }
	  }
	  
	loard(id){

		const h = $("#qnimate").is(":visible");
		if(h == false){
				
			
			this.chatactivate = true;	
			let setinterv = setInterval(()=>{
				if(this.chatactivate == false){
					this.chatactivate = true;
					}else{
					// this.checkchange = true;
					clearInterval(setinterv);
					}
				},700);
			if(this.chatactivate == true){
					// this.checkchange = true;
					$("#qnimate").animate({width: 'toggle'});
					$("#ch_" + id).click();
				}
				
			
		}else{
			
			if(this.chatactivate == true){
					// this.checkchange = true;
					$("#ch_" + id).click();
			}
			
		}
		
	}
	
	desactivatechat(){
		
		const h = $("#qnimate").is(":visible");
		
			if(h == true){
				this.chatactivate = false;
				let setinterv = setInterval(()=>{
					if(this.chatactivate == true){
						this.chatactivate = false;
						}else{
						clearInterval(setinterv);
						}
					},500);
					if(this.chatactivate == false){
							$("#qnimate").animate({width: 'toggle'});
						}
					this.photo = null;
					this.nom = null;
					this.id = null;
					this.checkchange = true;
					this.globalCompt = 0;
			}
	}
	
	gettimeconnexionup(date1, date2): any{
		
	/*conversion de date */
	const mils = 1000;
	const mils_inv = 1000 * 2 - 1;
	const min = 60000;
	const min_inv = 60000 * 2 - 1;
	const heure = 3600000;
	const heure_inv = 3600000 * 2 - 1;
	const jour = 86400000;
	const jour_inv = 86400000 * 2 - 1;
	const semaine = 7 * 86400000;
	const semaine_inv = 7 * 86400000 * 2 - 1;
	const mois = 30 * 86400000;
	const mois_inv = 30 * 86400000 * 2 - 1;
	const annee = 360 * 86400000;	
	const annee_inv = 360 * 86400000 * 2 - 1;	
	let val = "quelques instants";
		
	let ms = this.diffdate(date1, date2,'');
	
	if(ms >0 && ms < min){
		let s = "";
	if(ms > mils_inv && ms < min){
			s="s";
		}
		
		val = this.diffdate(date1, date2,'s')+ " seconde"+s;
		
	}else if(ms >= min && ms < heure){
		let s = "";
	if(ms > min_inv && ms < heure){
			s="s";
		}
		
		val = this.diffdate(date1, date2,'m')+ " minute"+s;
		
	}else if(ms >= heure && ms < jour){
		let s = "";
	if(ms > heure_inv && ms < jour){
			s="s";
		}
		val = this.diffdate(date1, date2,'h')+" heure"+s;
	
	}else if(ms >= jour && ms < semaine){
		let s = "";
	if(ms > jour_inv && ms < semaine){
			s="s";
		}
	val = this.diffdate(date1, date2,'d')+" jour"+s;
	
	}else if(ms >= semaine && ms < mois){
		let s = "";
	if(ms > semaine_inv && ms < mois){
			s="s";
		}
	val = this.diffdate(date1, date2,'semaine')+" semaine"+s;
	
	}else if(ms >= mois && ms < annee){
	val = this.diffdate(date1, date2,'mois')+" mois";
	
	}else if(ms >= annee){
	let s = "";
	if(ms > annee_inv){
			s="s";
		}
	val = this.diffdate(date1, date2,'annee')+" an"+s;
	
	}
	return val;
	}
	
	
		diffdate(d1,d2,u): any{
			let div=1
			switch(u){
			 case 's': div=1000;
						 break;
			 case 'm': div=1000*60;
						 break;
			case 'h': div=1000*60*60;
						 break;
			 case 'd': div=1000*60*60*24;
						 break;
			case 'semaine': div=1000*60*60*24*7;
						 break;
			case 'mois': div=1000*60*60*24*30;
						 break;			 
			case 'annee': div=1000*60*60*24*360;
						 break;
			}
			 
			let Diff = d2 - d1;
			return Math.round((Diff/div));
		}
}
