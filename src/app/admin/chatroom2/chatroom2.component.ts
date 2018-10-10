import {Component, Input, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {LayoutComponent} from '../layout/layout.component';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {FilterPipe} from './Filtermembre.pipe';
import {FormBuilder} from '@angular/forms';
import * as $ from 'jquery';
import * as emoji from 'node-emoji';
import {RegisterService} from '../../core/services/personne/membre/register.service';
import {RequestChatroomService} from '../../core/services/Request-Chatroom/request-chatroom.service';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { OutilsService } from '../../core/services/outils.service';


@Component({
  selector: 'app-chatroom2',
  templateUrl: './chatroom2.component.html',
  styleUrls: ['./chatroom2.component.scss']
})
export class Chatroom2Component implements OnInit {
  public dataRec: any = [];
  public uid_receiv;
  public pathPhoto_rec;
  public named;
  public colorinf = "#ff6d05";
  public codeFinal;
  public resulloard: boolean;
  public ResultText;
  searchText: any;
  public fichier_tt;
  public message_ss;
  public fichierloader;
  userFilter: any = {nomComplet: ''};
  public retourAff: boolean;
  public messageAll: any = [];
  public messageAllFinished: any = [];
  public conteneur = 0;
  public Emoticones: any = [];
  public ImgVar: any = [];
  public ImgVarshow;
  public TabImg: any = [];
  public compteurMsg: any = [];
  public compteurLu: any = [];
  public bool: Boolean;
  public checkmsg: any;
  public tabCouleur = ["#007bff","#6610f2","#6f42c1","#e83e8c","#dc3545","#fd7e14","#ffc107","#28a745","#20c997","#17a2b8","#6c757d","#343a40","#6c757d","#28a745","#17a2b8","#ffc107","#dc3545","#343a40"];
	public colortab: any = [];
  constructor(public layoutComponent: LayoutComponent, public  http: HttpClient, 
  	public fb: FormBuilder, public regist: RegisterService, public firbaseRequest: RequestChatroomService, 
  	private _sanitizer: DomSanitizer, public outils: OutilsService) {
    this.changeVarUser(null, null, null, '#ff6d05');
    //  this.sidnavClose();
    this.resulloard = true;
    this.ResultText = 'Chargement en cour...';
    this.sidnavClose();
	this.getEmoti();
	this.getallStat();
	this.toogle_close();
	// this.loadTabcolor();
  }
  
 
  
  // loaderint(){
		  // alert();
		  	// let int = setInterval(()=>{
				// if ($(window).width() > 820) {
					// $('.gauche-h').removeClass('cacher');
					// $('.droite-h').removeClass('afficher');
					// this.retourAff = true;
					// clearInterval(int);
				// }
				// }, 1000);
	// }
	
	
	
  toogle_close(){
  
  $(document).click(function(){
  
	  if($('#emoticonesid').is(":visible") == true){
	  
			$('#btnId').click(function(){
			  return false;
			}); 
			
			$('#emoticonesid').click(function(){
			  return false;
			}); 
			
			$('#emoticonesid').hide(200); 
			
		  }
		  

	 
	});
	let u = this;
	$(document).ready(function(){

		  	let int = setInterval(()=>{
				if ($(window).width() > 820) {
					$('.gauche-h').removeClass('cacher');
					$('.droite-h').removeClass('afficher');
					this.retourAff = true;
					// clearInterval(int);
				}
			}, 1000);
	});
	
	  }
	  

  //afficher les emo au click en msg
  teste(emo){
  if(this.message_ss){
	  this.message_ss += emoji.emojify(' '+emo+ ' ');
	  $('#textMessage').focus();
	  }
	  else{
		  this.message_ss = emoji.emojify(' '+emo+ ' '); 
		  $('#textMessage').focus();
		  
		  }
	  }
	  
	  
	  // Recuperer le tab d'emoji
	getEmoti(){

			for(let i in emoji.emoji)
						this.Emoticones.push(emoji.emoji[i])

						this.Emoticones = this.Emoticones.sort();
							this.Emoticones = this.Emoticones.slice(1156, 1236);
				
		
		}
  onKey(value: string) {
    this.searchText += value;
  }

  ngOnInit() {
	  this.recupAllUser();
  }

  sidnavClose() {

  }

	// Envoi d'une discussion
  SEndDiscusion() {
	if(this.message_ss){	
    const libelle = 'Discussion';
    const code_disc = this.layoutComponent.InfoMembres.id + '_' + this.uid_receiv;
	
    const code_disc_rec = this.uid_receiv + '_' + this.layoutComponent.InfoMembres.id;
	
    const timerDisc = new Date().getTime();
	
    const datesender = new Date(timerDisc).toLocaleString();
    const urlData = libelle + '/' + code_disc + '/' + timerDisc;
    const urlData_rec = libelle + '/' + code_disc_rec + '/' + timerDisc;
	
    const data: any = {message: this.message_ss, fichier: ' ', Date_s: datesender, codeSender: this.layoutComponent.InfoMembres.id , images: '', status : 0, idreceiver: this.uid_receiv};
	
    this.firbaseRequest.CreateSendData( urlData, data);
    this.firbaseRequest.CreateSendData( urlData_rec, data);
	this.message_ss = null;
	$('#textMessage').focus();
	this.scrollF();
	}
  }
  
  // traitement du scroll
  scrollF(){
  const interv = setInterval( ()=> {

  const tailleT = Math.round($('.band-droite-bas').outerHeight(true) + $('.band-droite-bas').scrollTop());
 
	  $('.band-droite-bas').animate({'scrollTop': $('.band-droite-bas')[0].scrollHeight});
	  	$('#textMessage').focus();
	  if(tailleT == $('.band-droite-bas')[0].scrollHeight){
		  clearInterval(interv);
		  }
  },1000);
	  }
	 
	 // taper entrer pour envoyer le mesage
  enterSend(param: KeyboardEvent){
	  if(param.which === 13){
			this.SEndDiscusion();
			// $('#textMessage').val('dsgssf');
		  } 
  }
  
  // recuperation des image a envoyé
  recuptImgs(file){
			let compt = file.target.files.length;
			for(let i=0; i< compt; i++){
				this.ImgVar[i] = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file.target.files[i]));  
			}     
	}
	  
	  // supprimer une image avant envoi
	  
	RemoveItemTab(removeItem){
		let i = $.inArray(removeItem,this.ImgVar)
		if (i >= 0){
			this.ImgVar.splice(i, 1);
		}
	}
	  
	  
 
	 // recuperation des message par discussion 
  receiveMsg(uid_receiv){
  $('#textMessage').focus();
  this.messageAll = [];
  this.checkmsg = 'Chargement de la discussion en cours...';
	let verif = 0;
  this.messageAllFinished[uid_receiv] = null;
  this.compteurMsg[uid_receiv] = 0;
  const libelle = 'Discussion';
  const code_disc = this.layoutComponent.InfoMembres.id + '_' + uid_receiv;
  const code_disc_rec = uid_receiv + '_' + this.layoutComponent.InfoMembres.id;
  const urlData = libelle + '/' + code_disc ;
  let h = 0;
		this.firbaseRequest.getAll(urlData).on("value", snapshot => {
		let uidreg = this.getUid();
		if(uidreg){
		// alert(uidreg);
		let compr = Object.keys(snapshot.val()).length;
		let valeurData = Object.keys(snapshot.val());
		// console.log(compr);
		this.conteneur = compr;
		let i=0;
		let w = compr;
		for(i==0; i < compr; i++){
			const urlData2 = libelle + '/' + code_disc + '/' + valeurData[i];
			const urlData3 = libelle + '/' + code_disc_rec + '/' + valeurData[i];
			this.firbaseRequest.getAll(urlData2).on("value", snapshot => {
			// alert(' uidrecever   :  ' + uid_receiv+'senderid : ' + snapshot.val().idreceiver +'---- codesender :  ' +  snapshot.val().codeSender);
			// alert(uid_receiv);
					if(snapshot.val().idreceiver === uidreg || snapshot.val().codeSender === uidreg){
						
				this.messageAll[i] = snapshot.val(); 
				let dataUpdates = {status : 1};
				this.firbaseRequest.UpdateData(urlData2, dataUpdates);
				verif++;
				this.checkmsg = '';
						}
				// this.firbaseRequest.UpdateData(urlData3, dataUpdates);
				// this.firbaseRequest.getDataFile(code_disc+ '/' + valeurData[i])
				 
				});
		}

		this.messageAllFinished[uidreg] = this.messageAll;
		
		
		this.scrollF();
		}
  });
  
	
		if(verif === 0){
	
			this.checkmsg = 'Aucun Elements trouvé pour cette discussion !';
			
		}else{
		
		
		
		}
			
	  }
	  
	  
	  //recuperation de l'id du message afficher
	  
	  getUid(){
		  return this.uid_receiv;
		  }
	 
	 
	 // fonctions de gestion du status des message lu et nn lu {{fonction 1}}
	getallStat(){
		if(this.dataRec){
		let iterval = setInterval( ()=>{
			let h = this.dataRec.length;
	
			for(let i=0; i< h; i++){
				let id = this.dataRec[i].id;
				// alert(id);
				this.receivStatus(id);
				this.receivStatuslu(id);
	  const code_disc = this.layoutComponent.InfoMembres.id + '_' + id;				
				// alert(this.compteurMsg.code_disc);
			}
			
			if(this.bool){
				clearInterval(iterval);
				}
		},1000)
		}
	}
	
	playaudio(){
		  
		let flush = new Audio('/assets/audio/1.mp3');
		flush.play();
		flush.volume = 0.5;
		  }
	//{{fonction 2}}
	  receivStatus(uid_receiv){
		let vr = 0;
	  const libelle = 'Discussion';
	  const code_disc = this.layoutComponent.InfoMembres.id + '_' + uid_receiv;
	  const urlData = libelle + '/' + code_disc ;
	  let u = this;
		this.firbaseRequest.getAll(urlData).on("value", snapshot => {
		if(snapshot.val()){
				let compr = Object.keys(snapshot.val()).length;
				let valeurData = Object.keys(snapshot.val());
				let i=0;
				let w = 0;
				u.compteurMsg[uid_receiv] = 0;
				for(i==0; i < compr; i++){
					const urlData2 = libelle + '/' + code_disc + '/' + valeurData[i];
					u.firbaseRequest.getAll(urlData2).on("value", snapshot => {
						
						if(snapshot.val().status === 0){
							
							u.compteurMsg[uid_receiv] = u.compteurMsg[uid_receiv] + 1; 
							// alert(uid_receiv  +'----' + snapshot.val().status + '----'+ this.compteurMsg[uid_receiv]);
							// alert(snapshot.val().codeSender + ' ------ ' + this.layoutComponent.InfoMembres.id);
							if(snapshot.val().codeSender != u.layoutComponent.InfoMembres.id && u.compteurMsg[uid_receiv] > 0){
								
							
									vr++;
								}
						}else{
						
							// alert(snapshot.val().status);
						}
						 
						});
				}
				
				if(vr > 0){
					u.playaudio();
					}
				this.bool = true;
				// alert(this.compteurMsg.uid_receiv);
		
		}
  });
	
	
 
	  }
	  
	  
	  
	  
	  
	  receivStatuslu(uid_receiv){
		
	  const libelle = 'Discussion';
	  const code_disc = uid_receiv + '_' + this.layoutComponent.InfoMembres.id;
	  const urlData = libelle + '/' + code_disc ;
	  let u = this;
		this.firbaseRequest.getAll(urlData).on("value", snapshot => {
		if(snapshot.val()){
				let compr = Object.keys(snapshot.val()).length;
				let valeurData = Object.keys(snapshot.val());
				let i=0;
				let w = 0;
				u.compteurLu[uid_receiv] = 0;
				for(i==0; i < compr; i++){
					const urlData2 = libelle + '/' + code_disc + '/' + valeurData[i];
					u.firbaseRequest.getAll(urlData2).on("value", snapshot => {
						
						if(snapshot.val().status === 0){
							
							u.compteurLu[uid_receiv] = u.compteurLu[uid_receiv] + 1; 
					
						}else{
						
							// alert(snapshot.val().status);
						}
						 
						});
				}
				this.bool = true;
				// alert(this.compteurLu.uid_receiv);
		
		}
  });
	
	
 
	  }
	
	// charger une discussion par user
  changeVarUser(id, pathPhoto, name, color) {
    this.uid_receiv = id;
    this.pathPhoto_rec = pathPhoto;
    this.named = name;
    this.colorinf = color;
	this.codeFinal = id + '_' + this.layoutComponent.InfoMembres.id;
	this.receiveMsg(this.uid_receiv);

    if ($(window).width() < 820) {
      $('.gauche-h').addClass('cacher');
      $('.droite-h').addClass('afficher');
      this.retourAff = true;
    }
	
  }
	//retour pour telephone
  retourMembre() {
    if ($(window).width() < 820) {
      $('.gauche-h').removeClass('cacher');
      $('.droite-h').removeClass('afficher');
      this.retourAff = true;
    }

  }

  sendMsg() {
    alert(this.message_ss);
  }

  // recuperation de tous les users
  
  
  
  loadTabcolor(data: any){
	  // if(let i in this.tabCouleur)
		  const tablength = this.tabCouleur.length;

	
			let int = setInterval(()=>{
				if(data){
				
				for(let i=0; i < data.length; i++){
					let col = Math.floor(Math.random() * Math.floor(tablength));
					// alert($.inArray(this.tabCouleur[col], this.colortab));
					if($.inArray(this.tabCouleur[col], this.colortab) == -1 ){
							
							this.colortab[i] = this.tabCouleur[col];
					}else{
					if(this.colortab.length >= tablength){
					
						this.colortab[i] = this.tabCouleur[col];
						
						}else{
						
						i--;
						}
					}
					
					
					
					
					}
					clearInterval(int);
				}
			}, 1000);
							// console.log(this.colortab);

	  // tabCouleur
	  }
	  
  recupAllUser() {
		this.ResultText = '';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get<HttpResponse<any>>(`${this.outils.getBaseUrl()}/typePersonnes/ME`, {
      headers: headers,
      observe: 'response'
    }).subscribe((resul) => {
        if (resul.status === 200) {
		this.loadTabcolor(resul.body.body);
          this.dataRec = resul.body.body;
          this.resulloard = false;
          const dsp = $('.search-bar').attr('name');
        } else {
          console.log(resul.body);
          this.resulloard = true;
          this.ResultText = 'Aucun Membre Trouver ou Disponible';
		  // alert('Aucun Membre Trouver ou Disponible');
        }
      },
      err => {
        console.log(err);
        this.resulloard = true;
        this.ResultText = 'Erreur de chargement. Veuillez reessayer';
        alert('Alert! erreur.');
      });
	  
  }
  
  UrlExists(url) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
}
