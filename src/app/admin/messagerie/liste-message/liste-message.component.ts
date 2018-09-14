import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MessagerieService } from '../../../core/services/messagerie/messagerie.service';
import { Messagerie } from '../../../shared/models/messagerie/messagerie';
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
		    this.fetchBlocks()
	    });
	    
	}
	fetchBlocks() {
	   this.messagerieService.getAllMessagesByAbonneId(+this.idPersonne)
		.subscribe(res => {
	    this.messages = res.body;
	     console.log('les abonnes de ListAbonnesBlockComponent', res.body);
	    this.maxMsg = this.messages.length;
	  });
	}

	onViewMessage(msg:Messagerie):void{
		this.selectedMessage = msg;
		this.router.navigate(['/admin/messagerie/read',msg.id]);
	}
}
