import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { Navs }  from '../../../shared/views_models/navs';
import { Detailblock } from '../../../shared/models/detailblock';

@Component({
  selector: 'app-espace',
  templateUrl: './espace.component.html',
  styleUrls: ['./espace.component.scss']
})
export class EspaceComponent implements OnInit {
	top_zone: AdminTopZone = null;
  	admin_card: AdminCard = null;
  	detailBlock: Detailblock[]=[];
	constructor() {
		this.top_zone = new AdminTopZone (
	  		'Paiement', 
	  		'Mes espaces',
	  		[
	  			new Navs('Accueil', '/admin'),
	  			new Navs('Paiement', '/admin/paiement'),
	  		],
	  		new Navs ('espace', ''),
	  		'home',
	  	);

	  	this.admin_card = new AdminCard(
	  		'Liste de mes abonnements',
	  		'/admin/paiement/abonnement'
	  		);
	}

	ngOnInit() {

	}

}
