import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LayoutComponent} from '../layout/layout.component';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {FilterPipe} from './Filtermembre.pipe';
import {FormBuilder} from '@angular/forms';
import * as $ from 'jquery';
import {RegisterService} from '../../core/services/personne/membre/register.service';
import {RequestChatroomService} from '../../core/services/Request-Chatroom/request-chatroom.service';


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
  public resulloard: boolean;
  public ResultText;
  searchText: any;
  public fichier_tt;
  public message_ss;
  public fichierloader;
  userFilter: any = {nomComplet: ''};
  public retourAff: boolean;
  public messageAll: any = [];
  public conteneur = 0;
  constructor(public layoutComponent: LayoutComponent, public  http: HttpClient, 
    public fb: FormBuilder, public regist: RegisterService, 
    public firbaseRequest: RequestChatroomService) {
    this.changeVarUser(null, null, null);
    //  this.sidnavClose();
    this.recupAllUser();
    console.log(this.dataRec);
    this.resulloard = true;
    this.ResultText = 'Chargement en cour...';
    this.sidnavClose();
		
  }

  onKey(value: string) {
    this.searchText += value;
  }

  ngOnInit() {
  }

  sidnavClose() {

  }


  SEndDiscusion() {
  
    console.log(this.regist.InfoMembres);
    const libelle = 'Discussion';
    const code_disc = this.layoutComponent.InfoMembres.id + '_' + this.uid_receiv;
    const code_disc_rec = this.uid_receiv + '_' + this.layoutComponent.InfoMembres.id;
    const timerDisc = new Date().getTime();
    const datesender = new Date();
    const urlData = libelle + '/' + code_disc + '/' + timerDisc;
    const urlData_rec = libelle + '/' + code_disc_rec + '/' + timerDisc;
    const data: any = {message: this.message_ss, fichier: ' ', Dates: datesender,
     codeSender: this.layoutComponent.InfoMembres.id };
    this.firbaseRequest.CreateSendData( urlData, data);
    this.firbaseRequest.CreateSendData( urlData_rec, data);
	this.message_ss = null;
	// $(".band-droite-bas").scrollTop($(".band-droite-bas").offset().top + $(".band-droite-bas").outerHeight(true));
	this.scrollF();
	
  }
  
  scrollF(){
  const interv = setInterval( ()=> {

  const tailleT = Math.round($('.band-droite-bas').outerHeight(true) +
   $('.band-droite-bas').scrollTop());
 
	  $('.band-droite-bas').animate({'scrollTop': $('.band-droite-bas')[0].scrollHeight}, 'slow');
	  
	  if(tailleT == $('.band-droite-bas')[0].scrollHeight){
		  clearInterval(interv);
		  }
  },1000);
	  }
	  
	  
  receiveMsg(uid_receiv){
  
  this.messageAll = [];
  const libelle = 'Discussion';
  const code_disc = this.layoutComponent.InfoMembres.id + '_' + uid_receiv;
  const urlData = libelle + '/' + code_disc ;
  let h = 0;
		this.firbaseRequest.getAll(urlData).on("value", snapshot => {
		let compr = Object.keys(snapshot.val()).length;
		let valeurData = Object.keys(snapshot.val());
		console.log(compr);
		this.conteneur = compr;
		let i=0;
		let w = compr;
		for(i==0; i < compr; i++){
			const urlData2 = libelle + '/' + code_disc + '/' + valeurData[i];
			this.firbaseRequest.getAll(urlData2).on("value", snapshot => {
					
				this.messageAll[i] = snapshot.val(); 
				 
				});
		}
		
		this.scrollF();
		
  });
  
 
	  }

  changeVarUser(id, pathPhoto, name) {
    this.uid_receiv = id;
    this.pathPhoto_rec = pathPhoto;
    this.named = name;
		
	this.receiveMsg(id);
    console.log(this.uid_receiv);
    console.log(this.pathPhoto_rec);
    console.log(this.named);

    if ($(window).width() < 820) {
      $('.gauche-h').addClass('cacher');
      $('.droite-h').addClass('afficher');
      this.retourAff = true;
    }
	
  }

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

  recupAllUser() {
		this.ResultText = '';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get<HttpResponse<any>>('http://localhost:8080/typePersonnes/ME', {
      headers: headers,
      observe: 'response'
    }).subscribe((resul) => {
        if (resul.status === 200) {
          this.dataRec = resul.body.body;
          console.log(resul.body.body);
          this.resulloard = false;
          const dsp = $('.search-bar').attr('name');
        } else {
          alert('Authentification incorrecte!');
          console.log(resul.body);
          this.resulloard = true;
          this.ResultText = 'Aucun Membre Trouver ou Disponible';
		  // alert('Aucun Membre Trouver ou Disponible');
        }
      },
      err => {
        console.log('Error: ' + err);
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
