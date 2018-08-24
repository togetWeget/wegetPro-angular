import { Component, OnInit, Input } from '@angular/core';
import { Tarif } from '../../../shared/models/tarif/tarif';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AbonnementService} from '../../../core/services/abonnements/abonnement.service';
import {switchMap} from 'rxjs/operators';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { Navs }  from '../../../shared/views_models/navs';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent implements OnInit {
	top_zone: AdminTopZone = null;
  	admin_card: AdminCard = null;
	tarifs: Tarif[]=[];
	tarifselected: Tarif;

    constructor(private route: ActivatedRoute, 
    			private router: Router, 
    			private abonnementServices: AbonnementService) {

    	this.top_zone = new AdminTopZone (
	  		'Abonnements', 
	  		'Formule',
	  		[
	  			new Navs('Accueil', '/admin'),
	  			new Navs('Espace', '/admin/paiement/espace'),
	  		],
	  		new Navs ('formules', ''),
	  		'home',
	  	);

	  	this.admin_card = new AdminCard(
	  		'Liste des formules d\'abonnement',
	  		' '
	  	); 
	}

    ngOnInit() {
    	this.fetchTarif();
  	}

  	fetchTarif() {
    	this.route.paramMap.pipe(
      			switchMap((params: ParamMap) =>
        		this.abonnementServices.getAlltarifsByBlocksId(+params.get('id')))
    	).subscribe(res => {
        this.tarifs = res.body;
    	});
  	}

  	onPayer(prix: Tarif) {
	    this.tarifselected = prix;
	    this.router.navigate(['/abonnement', 'form', prix.idBlock]);
  	}
}
