import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MessagerieService } from '../../../core/services/messagerie/messagerie.service';
import { Messagerie } from '../../../shared/models/messagerie/messagerie';
import { Message } from '../../../shared/models/messagerie/message';
import { Detailblock } from '../../../shared/models/detailblock';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';

@Component({
  selector: 'app-liste-message',
  templateUrl: './liste-message.component.html',
  styleUrls: ['./liste-message.component.scss']
})
export class ListeMessageComponent implements OnInit {
	messages: Messagerie[] = [];
	selectedMessage: Messagerie;
	dblk: Detailblock;
	@Input() maxMsg:number;
	idPersonne:number;
	nonLus: number = 0;
	

	constructor(
	  	private messagerieService: MessagerieService, 
	  	private router:Router,
	  	private route:ActivatedRoute,
	  	private abonneService: AbonnesService) {
			
	  	 }

	ngOnInit() {
	  	this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
	    .subscribe((res:any)=> {
	  	    this.dblk = res.body;    
		    console.log(res.body);
		    this.idPersonne=this.dblk[0].membre.id;
		    this.fetchBlocks();
	    });
	    
	}
	fetchBlocks() {
	   this.messagerieService.getAllMessagesByAbonneId(+this.idPersonne)
		.subscribe(res => {
	    this.messages = res.body;
	     console.log('les messages recupérés', res.body);
	    this.maxMsg = this.messages.length;
		this.getNonLus(this.messages);
	  });
	}

	onViewMessage(msg:Messagerie):void{
		this.selectedMessage = msg;
		this.router.navigate(['/admin/messagerie/read',msg.id]);
	}

	lireMessage(msg: Messagerie){
		const ms = new Messagerie(
			msg.id,
			msg.version,
			msg.personne,
			new Message(
				msg.message.id,
				msg.message.version,
				msg.message.sujet,
				msg.message.contenu,
				msg.message.date,
				false
				),
			msg.expediteur
			)
		this.messagerieService.changeStatusMessage(msg)
		.subscribe(res => {
		    this.messagerieService.getAllMessagesByAbonneId(+this.idPersonne)
				.subscribe(res => {
			    this.messages = res.body;
			     console.log('les messages recupérés', res.body);
			    this.maxMsg = this.messages.length;
				this.getNonLus(this.messages);
		    	this.router.navigate([`/admin/messagerie/read/${msg.message.id}`]);
			  });
      // this.message = res.body;
      console.log(res);
    });
	}

	getNonLus(msgs: Messagerie[]){
		let nonLus = 0;
		for(let m of msgs){
			if(m.message.statut){
				nonLus++;
			}
		}
		this.nonLus = nonLus;
		this.messagerieService.setNonLu(this.nonLus);
	}
}
