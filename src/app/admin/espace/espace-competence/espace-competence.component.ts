import { Component, OnInit,Input } from '@angular/core';
import { Router,ParamMap,ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { MatDialog} from '@angular/material';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { Navs }  from '../../../shared/views_models/navs';
import { PersonalButton }  from '../../../shared/views_models/personal-button';
import { Detailblock } from '../../../shared/models/detailblock';
import {AbonnementService} from '../../../core/services/abonnements/abonnement.service';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';

@Component({
  selector: 'app-espace-competence',
  templateUrl: './espace-competence.component.html',
  styleUrls: ['./espace-competence.component.scss']
})
export class EspaceCompetenceComponent implements OnInit {

  	top_zone: AdminTopZone = null;
  	admin_card: AdminCard = null;
  	detailBlock: Detailblock;
	constructor(private route: ActivatedRoute,
              	private router: Router,
              	private formDialog: MatDialog,
              	private abonnementServices:AbonnementService,
              	private abonneService: AbonnesService) {
		this.getDetailBlock();
		this.top_zone = new AdminTopZone (
	  		'', 
	  		'',
	  		[
	  			new Navs('Accueil', '/admin'),
	  			new Navs('Espace', '/admin/paiement/espace'),
	  		],
	  		new Navs ('liste', ''),
	  		'home',
	  	);

	  	this.admin_card = new AdminCard(
	  		'',
	  		''
	  		);
	}

  ngOnInit() {
  }

  getDetailBlock(){
      /*this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
      .subscribe((data: any)=> {
	  	  this.detailBlock = data.body;
	  	  this.top_zone.titre = this.detailBlock.block.libelle;
	      this.top_zone.sous_titre=this.detailBlock.block.libelle;
  	  });  */ 
   }
}
