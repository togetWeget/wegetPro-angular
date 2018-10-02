import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ChatLiasonService} from '../../core/services/chat-liason/chat-liason.service';
import {FilterPipe} from './Filtermembre.pipe';
import {RequestChatroomService} from '../../core/services/Request-Chatroom/request-chatroom.service';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-chat-cli',
  templateUrl: './chat-cli.component.html',
  styleUrls: ['./chat-cli.component.scss']
})

export class ChatCliComponent implements OnInit {
	public chatactive : boolean;
	public memebreall : any = [];
	public messageAll : any = [];
	userFilter : any = {nomComplet : ''};
  constructor(public chatact: ChatLiasonService, public firbaseRequest: RequestChatroomService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  this.memebrealls();
	   // if( this.chatact.checkchange){
			// this.chatact.checkchange = true;
	   // }else{
			// this.chatact.checkchange = false;
	   // }
	   
	   
			this.chatact.checkchange = true;
			this.chatact.miximaze = true;
	  
	   
	   // console.log('val : ' + this.chatact.checkchange);
  }
  
  change(){
		  if( this.chatact.checkchange == true){
			  
				this.chatact.checkchange = false;
		  }else{
				this.chatact.checkchange = true;
		  }
		  
		  // console.log('val : ' + this.chatact.checkchange);
	  }
	ifactivechat(): boolean{
			let token = localStorage.getItem('togetToken');
			let tokenLog = localStorage.getItem('log');
			// let tokenfirebase = localStorage.getItem('firebase:host:toget-2b431.firebaseio.com');
			
			if(token && tokenLog){
					return true;
				}else{
					return false;
				}
	}
	
	activatechat(){
	const h = $("#qnimate").is(":visible");
	if(h == false){
		this.chatact.chatactivate = true;	
		let setinterv = setInterval(()=>{
			if(this.chatact.chatactivate == false){
				this.chatact.chatactivate = true;
				}else{
				clearInterval(setinterv);
				}
			},700);
		if(this.chatact.chatactivate == true){
				$("#qnimate").animate({width: 'toggle'});
			}
			
	}
	}
	
	desactivatechat(){
	
	const h = $("#qnimate").is(":visible");
	
		if(h == true){
			this.chatact.chatactivate = false;
			let setinterv = setInterval(()=>{
				if(this.chatact.chatactivate == true){
					this.chatact.chatactivate = false;
					}else{
					clearInterval(setinterv);
					}
				},500);
				if(this.chatact.chatactivate == false){
						$("#qnimate").animate({width: 'toggle'});
					}
		}
	}
	
	
	search(){
		$(".search").slideToggle();
		}
	
	memebrealls(){
	let u = this;
		let mem = this.chatact.getinfoMembre().done(function(data) {
			u.memebreall = data.body;
			u.memebreall.sort((a,b)=>{return a.nomComplet > b.nomComplet;});
			console.log(u.memebreall);
		  })
		  .fail(function() {
			console.log( "error" );
		  })
		  .always(function() {
			console.log( "complete" );
		  });
		
		}
		
		changeval(photo, nom, id){
				this.chatact.photo = photo;
				let dsp = nom.split(' ');
				this.chatact.nom = dsp[0];
				this.chatact.id = id;
				this.getchatinf(this.chatact.id);
				this.chatact.checkchange = false;
			}
			
		maximin(){
						
			if(this.chatact.miximaze == true){
				this.chatact.miximaze = false;
			  $('#qnimate').removeClass('popup-box-max');
			  $('#qnimate').addClass('popup-box-min');
		  }else{
				
				this.chatact.miximaze = true;
			  $('#qnimate').removeClass('popup-box-min');
			  $('#qnimate').addClass('popup-box-max');
		  }
		}
		
		getud(){
			return this.chatact.id;
		}
		getchatinf(uid_receiv){

	let verif = 0;
  const libelle = 'Discussion';
  const getuid = this.chatact.InfoMe.id;
  const code_disc = getuid+ '_' + uid_receiv;
  const code_disc_rec = uid_receiv + '_' + getuid;
  const urlData = libelle + '/' + code_disc ;
		this.firbaseRequest.getAll(urlData).on("value", snapshot => {
		let uidreg = this.getud();
		if(uidreg){
		// alert(uidreg);
		let compr = Object.keys(snapshot.val()).length;
		let valeurData = Object.keys(snapshot.val());
		let i=0;
		let w = compr;
		for(i==0; i < compr; i++){
			const urlData2 = libelle + '/' + code_disc + '/' + valeurData[i];
			const urlData3 = libelle + '/' + code_disc_rec + '/' + valeurData[i];
			this.firbaseRequest.getAll(urlData2).on("value", snapshot => {

					if(snapshot.val().idreceiver === uidreg || snapshot.val().codeSender === uidreg){
						
				this.messageAll[i] = snapshot.val(); 
				let dataUpdates = {status : 1};
				this.firbaseRequest.UpdateData(urlData2, dataUpdates);
				verif++;
						}

				});
		}
			console.log(this.messageAll);
		// this.messageAllFinished[uidreg] = this.messageAll;
		
		
		this.scrollF();
		}
  });
  

			
	  		
			
		}
		
		 scrollF(){
  const interv = setInterval( ()=> {

  const tailleT = Math.round($('.direct-chat-messages').outerHeight(true) + $('.direct-chat-messages').scrollTop());
 
	  $('.direct-chat-messages').animate({'scrollTop': $('.direct-chat-messages')[0].scrollHeight});
	  	$('#status_message').focus();
	  if(tailleT == $('.direct-chat-messages')[0].scrollHeight){
		  clearInterval(interv);
		  }
  },1000);
	  }
	 
	 // taper entrer pour envoyer le mesage
  // enterSend(param: KeyboardEvent){
	  // if(param.which === 13){
			// this.SEndDiscusion();
		  // } 
  // }
}
