import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ChatLiasonService} from '../../core/services/chat-liason/chat-liason.service';
import {RecordService} from '../../core/services/record/record.service';
import {FilterPipe} from './Filtermembre.pipe';
import {RequestChatroomService} from '../../core/services/Request-Chatroom/request-chatroom.service';
import DataSnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { OutilsService } from '../../core/services/outils.service';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SaveFilesComponent } from '../../core/comp/save-files/save-files.component';
import { SaveFile2Component } from '../../core/comp/save-file2/save-file2.component';
import {LoginComponent} from '../../core/clients/login/login.component';
import * as emoji from 'node-emoji';
import * as fx from 'mkdir-recursive';
import * as ts from "typescript";
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';
import {InfoMembreService} from '../../core/services/info-membre/info-membre.service';
import {
  ActivatedRoute,
  CanActivate,
  CanLoad,
  CanActivateChild,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment, UrlTree
} from '@angular/router';
// import {MatDialog} from '@angular/material';
declare const ActiveXObject: (type: string) => void;
declare const MediaRecorder: any;
@Component({
  selector: 'app-chat-cli',
  templateUrl: './chat-cli.component.html',
  styleUrls: ['./chat-cli.component.scss']
})

export class ChatCliComponent implements OnInit {
	public chatactive : boolean;
	public memebreall : any = [];
	public messageAll : any = [];
	public testcheck: any;
	userFilter : any = {nomComplet : ''};
	public cnpt: any = 0;
	public message_ss: any;
	public compteurMsg: any = [];
	public bool: boolean;
	public dataidmsg : any = [];
	public tiOut;
	public timest;
	public socket: any = [];
	public checkMembre: boolean;
	public dataconnexion: any = [];
	public aucun: any = 0;
	public checkgreen: any = 1;
	public checkorange: any = 0;
	public totalTaille: any;
	public all: any = "";
	 public GEmoticones: any = [];
	 public Emoticones: any = [];
	 public Emoticones1: any = [];
	 public Emoticones2: any = [];
	 public emojihand: any = [];
	 public fichier: FileManagerModel[]=[];
	 public filesave: FileManagerModel[]=[];
	 public audiosave: FileManagerModel[]=[];
	 public progressebar: any = [];
	 public downloaded: any = [];
	 public straim: any;
  constructor(public chatact: ChatLiasonService, public firbaseRequest: RequestChatroomService, private _sanitizer: DomSanitizer,private fb: FormBuilder, public outils: OutilsService, private dialog: MatDialog, public router: Router, public rec: RecordService, public infoM: InfoMembreService) { 
	this.checkMembre = true;
	// this.getallStat();
	this.getserveurtime();
	this.getEmoti();
	this.emojihand.push(emoji.emoji["+1"]);	
	this.checknavigate();
	this.infoM.getbylogin();
	  }
	  

	  
    gethand(emo){		  
		this.message_ss = emoji.emojify(' '+emo+ ' ');	
		this.sendchatmsg();	  
    }
	  
  //afficher les emo au click en msg
	teste(emo){
		if(this.message_ss){
			this.message_ss += emoji.emojify(' '+emo+ ' ');
			$('#status_message').focus();
		}
	    else{
		  this.message_ss = emoji.emojify(' '+emo+ ' '); 
		  $('#status_message').focus();
		  
		 }
	}
	  
	  
	  // Recuperer le tab d'emoji
	getEmoti(){

			for(let i in emoji.emoji)
						this.GEmoticones.push(emoji.emoji[i])

						this.GEmoticones = this.GEmoticones.sort();
							this.GEmoticones = this.GEmoticones.slice(1156, 1236);
				
		// console.log(emoji.emoji["+1"]);
		let datadiv = Math.round(this.GEmoticones.length / 3);
		
			for(let h=0; h<3; h++){
				let deb = 0;
				// for(let y = deb; y < datadiv; y++){
					switch(h){
						case 0 :
						for(let w = 0; w< datadiv; w++){
						this.Emoticones.push(this.GEmoticones[w]);
						}
						break;
						
						case 1 :
						let chatdata = this.GEmoticones.length - datadiv;
						for(let w = datadiv; w< chatdata; w++){
						this.Emoticones1.push(this.GEmoticones[w]);
						}
						break;
						
						case 2 :
						let chatdata2 = this.GEmoticones.length - datadiv;
						for(let w = chatdata2; w< this.GEmoticones.length; w++){
						this.Emoticones2.push(this.GEmoticones[w]);
						}
						break;
						
						
					}
					
				// }
				
				
			}
		}
		
		
		
	checksearch(param){
		if(param == "checkgreen"){
			if ( $( "."+param ).is( ":checked" ) ){
				this.checkgreen = 1;
				this.checkorange = 1;
			}				
		}

		if(param == "checkorange"){
			
			if ( $( "."+param ).is( ":checked" ) ){
				this.checkgreen = 0;
				this.checkorange = 0;
			}			
			
		}

		if(param == "all"){
			
			if ( $( "."+param ).is( ":checked" ) ){
				this.checkgreen = 1;
				this.checkorange = 0;
			}			
			
		}
		
		
	}
	
choseFile(){
	this.filesave = null;
   const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_chat', multiple: true, accept: '.pdf, .doc, .docx, .ppt, .xls, .zip, .csv, .xlsx', must_return : true,  filename: this.chatact.InfoMe.id, url: `${this.outils.getBaseUrl()}/ph`}
    });

    dialogRef.afterClosed().subscribe(result => {
		if(result && result.length <= 5){
			this.filesave = result;
			this.message_ss = " ";
			this.sendchatmsg();
		}else{
				alert("Nombre de fichier autorisé depassé. veuillez faire une selection d'un maximum de 5 fichier");
		}

    }); 
 }

 choseFilephoto(){
	 this.fichier = null;
   const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_chat', multiple: true, accept: '.png, .PNG, .jpg, .JPG, .jpeg, .JPEG, .GIF, .gif', must_return : true,  filename: this.chatact.InfoMe.id, url: `${this.outils.getBaseUrl()}/ph`}
    });

    dialogRef.afterClosed().subscribe(result => {
		if(result && result.length <= 5){
			this.fichier = result;
			this.message_ss = " ";
			this.sendchatmsg();
		}else{
				alert("Nombre de fichier autorisé depassé. veuillez faire une selection d'un maximum de 5 fichier");
		}

    }); 
 }
 
 
 choseFilevideo(){
   const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'video_chat', multiple: false, type: '.mp4, .MP4, .3gp, .avi, .mov, .mkv', filename: this.chatact.InfoMe.id, url: `${this.outils.getBaseUrl()}/ph`}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    }); 
 }
 
 
 choseFileAudio(){
   const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'video_chat', multiple: false, type: '.mp3,.wav, .flac, .FLAC, .MP3, .WAV, .AAC, .Ogg, .WMA, .DSD,.AIFF, .ALAC', filename: this.chatact.InfoMe.id, url: `${this.outils.getBaseUrl()}/ph`}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    }); 
 }
  
  connexion(){
  // this.desactivatechat();
	 // this.router.navigate(['/login']); 
	 this.openModal();
	 
	 }

  inscription(){
  this.desactivatechat();
	 this.router.navigate(['/register']); 
	 }
  
  ngOnInit() {
  this.memebrealls();

	 this.fichier = null;  
	 this.filesave = null;  
	 this.audiosave = null;  
			this.chatact.checkchange = true;
			this.chatact.miximaze = true;
	  
			this.checkMembre = true;
			
			this.checksearch("all");
			
			this.hideEmo();
  }
  
  change(){
		  // if( this.chatact.checkchange == true){
			  
				// this.chatact.checkchange = false;
		  // }else{
				this.chatact.checkchange = true;
		  // }
		  
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
				this.chatact.photo = null;
				this.chatact.nom = null;
				this.chatact.id = null;	
				this.chatact.checkchange = true;
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
				this.chatact.photo = null;
				this.chatact.nom = null;
				this.chatact.id = null;
				this.chatact.checkchange = true;
				this.chatact.globalCompt = 0;
		}
	}
	
	
	search(){
		$(".search").slideToggle();
		}
	
	memebrealls(){
	this.checkMembre = true;
	let u = this;
		let mem = this.chatact.getinfoMembre().done((data)=> {
			u.memebreall = data.body;
			// u.memebreall.sort((a,b)=>{return a.nomComplet > b.nomComplet;});		
		  })
		  .fail(()=> {
			console.log( "error" );
			u.checkMembre = false;
		  })
		  .always(()=> {
				u.checkMembre = true;
				u.getallStat();
				u.getserveurtime();
				u.getEmoti();
				u.emojihand.push(emoji.emoji["+1"]);	
				u.checknavigate();
				
		  });
		
		}
		
		changeval(photo, nom, id){
				this.chatact.checkchange = true;
				this.chatact.photo = null;
				this.chatact.nom = null;
				this.chatact.id = null;
				
				
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
			  this.scrollF();
		  }else{
				
				this.chatact.miximaze = true;
			  $('#qnimate').removeClass('popup-box-min');
			  $('#qnimate').addClass('popup-box-max');
		  }
		}
/* **********************************************************  part 2  ****************************************************************** */	

		verifymessage(messageAll: any): boolean{
			if(messageAll){
				
					
				if((messageAll.audio == "" && messageAll.fichier == " " && messageAll.filesave == "" && messageAll.message == " ") || 
					(messageAll.audio == "" && messageAll.fichier == "" && messageAll.filesave == "" && messageAll.message == " ") ||
					(messageAll.audio == " " && messageAll.fichier == "" && messageAll.filesave == "" && messageAll.message == " ") ||
					(messageAll.audio == "" && messageAll.fichier == "" && messageAll.filesave == " " && messageAll.message == " ")){
						return false;
					}else{
						return true;
					}
			
			}
		}
		getud(){
			return this.chatact.id;
		}
		getchatinf(uid_receiv){
		 this.chatact.geting();
		 // console.log("2: "+ this.chatact.InfoMe.id);
			this.messageAll = [];
			this.dataidmsg = [];
			this.cnpt = 0;
			let verif = 0;
		  const libelle = 'Discussion';
		  if(this.chatact.InfoMe){
		  const getuid = this.chatact.InfoMe.id;
		  const code_disc = getuid+ '_' + uid_receiv;
		  const code_disc_rec = uid_receiv + '_' + getuid;
		  const urlData = libelle + '/' + code_disc_rec ;
		this.firbaseRequest.getAll(urlData).on("value", snapshot => {
		if(snapshot.val()){
			$(".chg").fadeIn(1000);
		let uidreg = this.getud();
		if(uidreg == uid_receiv){
		 this.chatact.geting();
		// alert(uidreg);
		let compr = Object.keys(snapshot.val()).length;
		let valeurData = Object.keys(snapshot.val());
		let i=0;
		let w = compr;
		this.messageAll = [];
		this.dataidmsg = [];
		this.socket[uid_receiv] = snapshot.val().keyup;
		// console.log("3: "+ this.chatact.InfoMe.id);
		for(i==0; i < compr; i++){
			const urlData2 = urlData + '/' + valeurData[i];
			const urlData3 = libelle + '/' + code_disc + '/' + valeurData[i];
			this.firbaseRequest.getAll(urlData2).on("value", snapshot => {
				if(snapshot.val()){
					
					
					if(snapshot.val().idreceiver === uidreg || snapshot.val().codeSender === uidreg){	
					
				
						this.messageAll[i] = snapshot.val(); 
						this.dataidmsg[i] = valeurData[i]; 
						verif++;
						let dataUpdates = {status : 1};
						this.firbaseRequest.UpdateData(urlData3, dataUpdates);
					
					}
					
				}

				});
		}
		  if(verif > 0){
		this.cnpt = 1; 
			  }
		  if(verif == 0){
				this.cnpt = 2; 
			  }
		
		this.scrollF();
		  $(".chg").fadeOut(2000);
		}
		
		}else{
		this.cnpt = 2; 
		}
	});


	}	
	  		
			
}
		
		 scrollF(){
		try{
  const interv = setInterval( ()=> {
		  const tailleT = Math.round($('.direct-chat-messages').outerHeight(true) + $('.direct-chat-messages').scrollTop());
			  $('.direct-chat-messages').scrollTop($('.direct-chat-messages')[0].scrollHeight);
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
	 
	 // taper entrer pour envoyer le mesage
  enterSend(param: KeyboardEvent){
	  if(param.which === 13){
			this.envoyerMTN();
		  } 
  }
  
  envoyerMTN(){
			this.sendchatmsg();
			$(".emoji").hide(); 	  
  }
  
  sendchatmsg(){
	  this.progressebar[this.chatact.id] = 0;
	  this.totalTaille = 0;
	if(this.message_ss){	
    const libelle = 'Discussion';
    const code_disc = this.chatact.InfoMe.id + '_' + this.chatact.id ;
	
    const code_disc_rec = this.chatact.id  + '_' + this.chatact.InfoMe.id;
	

	if(this.fichier != null || this.filesave != null || this.audiosave != null){
		let fich = "";
				$(".chg").fadeIn(400);
				if(this.filesave != null){
					this.fichier = this.filesave;
					fich = "filesave";
				}
				if(this.audiosave != null){
						
					this.fichier = this.audiosave;
					fich = "audiosave";
				}
			for(let i = 0; i < this.fichier.length; i++){
			let ttttt = "audio";
			if(this.audiosave == null){
			let extend = this.fichier[i].file.name.split('.');
			 ttttt = extend[extend.length - 1];
			}
			const timerDisc = new Date().getTime();
			
			const datesender = new Date(timerDisc).toLocaleString();
			const urlData = libelle + '/' + code_disc + '/' + timerDisc;
			const urlData_rec = libelle + '/' + code_disc_rec + '/' + timerDisc;
			
			const data: any = {message: this.message_ss, fichier: ' ', Date_s: datesender, codeSender: this.chatact.InfoMe.id , filesave: '', audio : '', status : 0, idreceiver: this.chatact.id, extension: ttttt };
			
			this.fileSend(this.fichier[i].file, urlData, this.fichier.length,fich, i);
			this.fileSend(this.fichier[i].file, urlData_rec, this.fichier.length, fich, i);
			this.autoUpdate();
			this.firbaseRequest.CreateSendData( urlData, data);
			this.firbaseRequest.CreateSendData( urlData_rec, data);

			
			
				
			}

	}else{
		
    const timerDisc = new Date().getTime();
	
		const datesender = new Date(timerDisc).toLocaleString();
		const urlData = libelle + '/' + code_disc + '/' + timerDisc;
		const urlData_rec = libelle + '/' + code_disc_rec + '/' + timerDisc;
		
		const data: any = {message: this.message_ss, fichier: ' ', Date_s: datesender, codeSender: this.chatact.InfoMe.id , filesave: '',audio: '', status : 0, idreceiver: this.chatact.id, extension: '' };
		this.autoUpdate();
		this.firbaseRequest.CreateSendData( urlData, data);
		this.firbaseRequest.CreateSendData( urlData_rec, data);		
			
	}
	this.message_ss = null;
	$('#status_message').focus();
	this.scrollF();
	this.fichier = null;
	this.filesave = null;
	this.audiosave = null;
	}	  
	   
  }
  
  getstatus(id){
		  // this.compteurMsg = [];
		  let ur = 0;
		  const libelle = 'Discussion';
		  const getuid = this.chatact.InfoMe.id;
		  const code_disc = getuid+ '_' + id;
		  const code_disc_rec = id + '_' + getuid;
		  const urlData = libelle + '/' + code_disc ;
		this.firbaseRequest.getAll(urlData).on("value", snapshot => {
		if(snapshot.val()){
		  this.chatact.globalCompt = 0;
			let uidreg = this.getud();
				// alert(uidreg);
				let compr = Object.keys(snapshot.val()).length;
				let valeurData = Object.keys(snapshot.val());
				let i=0;
				this.compteurMsg[id] = 0;
					for(i==0; i < compr; i++){
						const urlData2 = urlData + '/' + valeurData[i];
						this.firbaseRequest.getAll(urlData2).on("value", snapshot => {
							if(snapshot.val()){
								if(snapshot.val().status === 0){
									this.compteurMsg[id] = this.compteurMsg[id] + 1; 
									this.chatact.globalCompt = this.chatact.globalCompt + this.compteurMsg[id];
									if(getuid != snapshot.val().codeSender){
										ur = 1;
									}
								}
							}

							});
					}
				if(ur == 1){
						// this.playaudio();
					}
					ur = 0;
		this.bool = true;
		}
  });
  }
  
  	playaudio(){  
		let flush = new Audio('/assets/audio/1.mp3');
		flush.volume = 0.2;
		flush.play();
		  }
		  
	getallStat(){
		if(this.memebreall){
		let iterval = setInterval( ()=>{
			let h = this.memebreall.length;
	
			for(let i=0; i< h; i++){
				let id = this.memebreall[i].id;
				this.getstatus(id);
				this.getconnexion(id,i);
			}
			
			// if(this.bool){
				clearInterval(iterval);
			
				this.checkMembre = false;
				$("#ch_"+this.chatact.InfoMe.id).hide();
				
				// }
		},1000)
		
		}
	}	
	
	optionone(param){
			$(".option"+param).fadeIn(200);
	}
	optionoff(param){
			$(".option"+param).fadeOut(200);
	}
	
	deleteall(param){
		this.delmsgReverse(param);
		this.delmsg(param);
	}	
	
	delmsgReverse(param){
    const libelle = 'Discussion';
    const code_disc = this.chatact.InfoMe.id + '_' + this.chatact.id;
    const code_disc_rec = this.chatact.id +"_"+ this.chatact.InfoMe.id;
	const url = libelle + "/" + code_disc +"/"+ param;
	const url2 = libelle + "/" + code_disc_rec +"/"+ param;

			this.firbaseRequest.RemoveData(url2).then(() => {
				console.log("Remove succeeded.")
			})
			.catch((error)=> {
			console.log("Remove failed: " + error.message)
			});
			this.getchatinf(this.chatact.id);

	}
	
	
	delmsg(param){
    const libelle = 'Discussion';
    const code_disc = this.chatact.InfoMe.id + '_' + this.chatact.id;
    const code_disc_rec = this.chatact.id +"_"+ this.chatact.InfoMe.id;
	const url = libelle + "/" + code_disc +"/"+ param;
	const url2 = libelle + "/" + code_disc_rec +"/"+ param;
			this.firbaseRequest.RemoveData(url).then(()=> {
				console.log("Remove succeeded.")
			})
			.catch((error)=> {
			console.log("Remove failed: " + error.message)
			});
			
			
			this.firbaseRequest.RemoveData(url2).then(()=> {
				console.log("Remove succeeded.")
			})
			.catch((error)=> {
			console.log("Remove failed: " + error.message)
			});
			this.getchatinf(this.chatact.id);
			// this.firbaseRequest.RemoveData(url2);
	}
	
	  keyupchange(param){
	  clearTimeout(this.tiOut);
			const libelle = 'Discussion';
			const code_disc_rec = this.chatact.InfoMe.id + '_' + this.chatact.id;
			// const code_disc_rec = this.chatact.id +"_"+ this.chatact.InfoMe.id;
			const url2 = libelle + "/" + code_disc_rec;
		if(param){
		if(param.length > 0){
			const data: any = {
								keyup: 1
							  };
			this.firbaseRequest.UpdateData( url2, data);
			
			// console.log("send : " + param);
	    }
	    }
		

		this.timo(param,url2);
		
	  }
	  
	  
	  timo(param,uri){
		this.tiOut = setTimeout(()=>{

			const url2 = uri;
			const data: any = {
								keyup: 0
							  };
			this.firbaseRequest.UpdateData( url2, data);	
				
			
						},5000);
		}
		
		autoUpdate(){
			const libelle = 'Discussion';
			const code_disc_rec = this.chatact.InfoMe.id + '_' + this.chatact.id;
			const url2 = libelle + "/" + code_disc_rec;
			const data: any = {
								keyup: 0
							  };
			this.firbaseRequest.UpdateData( url2, data);		
			
			
		}
		
	getconnexion(urldata,dt){
	  let u =this;
	  this.firbaseRequest.getAll("connexionUp/" + urldata).on("value", snapshot => {
			u.getserveurtime();
			if(urldata != u.chatact.InfoMe.id){
				if(snapshot.val()){
					firebase.database().ref("/.info/serverTimeOffset").on('value', (offset)=> {
								u.aucun = 0;
								let offsetVal = offset.val() || 0;
								let timest = Date.now() + offsetVal;
								
							let d = new Date(snapshot.val().timestamp);
							d.setMinutes(d.getMinutes() + 5);
							let dateFinale = d.getTime();
							
						if(dateFinale < timest){
							if(snapshot.val().statusconnexion == 0){
								let h = u.chatact.gettimeconnexionup(dateFinale, timest);
								u.dataconnexion[urldata] = {status : parseInt(snapshot.val().statusconnexion), time: "il y a "+h};
								u.memebreall[dt].stconnexion = parseInt(snapshot.val().statusconnexion);
								u.memebreall[dt].time = "il y a "+h;
								}
						}
						if(snapshot.val().statusconnexion == 1){
							u.aucun = u.aucun + 1;
							u.dataconnexion[urldata] = {status : parseInt(snapshot.val().statusconnexion), time: "maintenant"};
							u.memebreall[dt].stconnexion = parseInt(snapshot.val().statusconnexion);
							u.memebreall[dt].time = "maintenant";
						}		
			
					}); 		
				}else{
					// u.dataconnexion[urldata] = {status : 0, time: "Absent"};
				}
			}
		});
	
	}
	
	getserveurtime(){
		let u = this;
		firebase.database().ref("/.info/serverTimeOffset").on('value', (offset)=> {
		let offsetVal = offset.val() || 0;
		u.timest = Date.now() + offsetVal;
		});  
	}
	
	fileSend(file: File, url: any, taille: any = 1, fich, i){
		// return new Promise((resolve, reject)=>{
			let u = this;
			const request = this.firbaseRequest.uploadFile(file, url);
		
		request.on('state_changed', (snapshot: any)=>{
			if(snapshot){
		u.progressebar[u.chatact.id] = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
		
			
					
					
			
				
			// switch (snapshot.state) {
				// case firebase.storage.TaskState.PAUSED:
					// console.log('Upload is paused');
			  // break;
				// case firebase.storage.TaskState.RUNNING:
					// console.log('Upload is running');
			  // break;
			// }
			}
			}, (error)=> {
			  // error code
			  console.log(error);
			}, ()=> {

			  request.snapshot.ref.getDownloadURL().then((downloadURL)=> {
		
				  let data: any = {};
				  switch(fich){
					  case 'audiosave' : 
						data = {audio: downloadURL};
					  break;
					  
					  case 'filesave' : 
					   data = {filesave: downloadURL}; 
					  break;
					  
					  default :
						 data = {fichier: downloadURL}; 
					  break;
				  }
				  
				u.firbaseRequest.UpdateData(url, data);
				
				if(taille - 1 == i){
					$(".chg").fadeOut(2000);
				}
			  }, (raison) => {
					console.log("erreur de update" + raison);
				});
			});
		// });
	}
	

	
	downloading(param, param2){
		// if(param2 != null && param2 != ' '){
			$("#doc_"+param).click();			
		// }
		// alert(param);
	}
	
		checknavigate(){

		
		
		}
		vertBlobTofile(blob: any): any{
			let file = new File([blob], "test.mp3", {type: "audio/mp3", lastModified: Date.now()});
			return file;
		}
		
	   hasGetUserMedia(): any {
			return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
		}	

		getaudioval(){
			// navigator.serviceWorker.register('sw.js', { insecure: true })
				let u = this;
				let filedata: any=[];				
		if (this.hasGetUserMedia()) {
				this.rec.getaudio().then((value)=> {
					console.log(value);
					filedata[0] = {file: value};
					if(filedata){
				  			u.audiosave = filedata;
							u.message_ss = " ";
							u.sendchatmsg();
						}
				});				
		} else {
		    alert('Not supported by your browser');
		}			

		}

		loadChatVideo(){
			this.rec.getvideo(1,5);
		}
		
		showEmo(){
			$(".emoji").toggle();
			
		}
		
		hideEmo(){

			$(document).on('click',(e)=>{
							if( $(e.target).is("#emoji *") == false && $(e.target).is("#emo") == false) {
								if($(".emoji").is(":visible") == true){
								// alert($(e.target).is("#emo"));
									$(".emoji").hide(); 
								}
					        }
			});
		}
		
  openModal () {
    const dialogRef = this.dialog.open(LoginComponent, {
      maxWidth: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
		// console.log(result);
		if(result && result == 1){
			window.location.reload(true);
			this.infoM.getbylogin();
			this.memebrealls();	
		}
		
    });
  }
}
