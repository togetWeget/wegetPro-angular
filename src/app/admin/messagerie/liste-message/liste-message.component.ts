import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MessagerieService } from '../../../core/services/messagerie/messagerie.service';
import { Messagerie } from '../../../shared/models/messagerie/messagerie';

@Component({
  selector: 'app-liste-message',
  templateUrl: './liste-message.component.html',
  styleUrls: ['./liste-message.component.scss']
})
export class ListeMessageComponent implements OnInit {
	  messages: Messagerie[] = [];
	  selectedMessage: Messagerie;

	  constructor(
	  	private messagerieService: MessagerieService, 
	  	private router:Router,
	  	private route:ActivatedRoute) { }

	  ngOnInit() {
	  	this.fetchBlocks();
	  }

	  fetchBlocks() {
	       this.route.paramMap.pipe(
	      switchMap((params: ParamMap) =>
	        this.messagerieService.getAllMessagesByAbonneId(+params.get('id')))
	    ).subscribe(res => {
	      this.messages = res.body;
	      console.log('les abonnes de ListAbonnesBlockComponent', res.body);
	   
	  });
	}
}
