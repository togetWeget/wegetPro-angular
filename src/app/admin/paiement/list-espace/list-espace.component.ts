import { Component, OnInit,Input } from '@angular/core';
import { Router,ParamMap,ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { MatDialog} from '@angular/material';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { Navs }  from '../../../shared/views_models/navs';
import { PersonalButton }  from '../../../shared/views_models/personal-button';
import { Detailblock } from '../../../shared/models/detailblock';
import { BlockComponent } from '../block/block.component';
import {AbonnementService} from '../../../core/services/abonnements/abonnement.service';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';

@Component({
  selector: 'app-list-espace',
  templateUrl: './list-espace.component.html',
  styleUrls: ['./list-espace.component.scss']
})
export class ListEspaceComponent  implements OnInit {
	top_zone: AdminTopZone = null;
  	admin_card: AdminCard = null;
  	detailBlock: Detailblock;
  	selectedblock: Detailblock;
  	idblock: number;
	constructor(private route: ActivatedRoute,
              	private router: Router,
              	private formDialog: MatDialog,
              	private abonnementServices:AbonnementService,
              	private abonneService: AbonnesService) {
		this.top_zone = new AdminTopZone (
	  		'Abonnements', 
	  		'Mes abonnements',
	  		[
	  			new Navs('Accueil', '/admin'),
	  			new Navs('Abonnement', '/admin/abonnement'),
	  		],
	  		new Navs ('liste', ''),
	  		'home',
	  	);

	  	this.admin_card = new AdminCard(
	  		'Liste de mes abonnements',
	  		'',
	  		[
	  			new PersonalButton('abonnement',"S'abonner",'plus','','blue')
	  		]
	  		);
	}

	ngOnInit() {
		this.fetchAllBlock();
	}
	handleClick(event: string) {
		switch (event) {
			case "abonnement":
				this.onSAbonne();
				break;
			
			default:
				// code...
				break;
		}

	}
	onSAbonne(): void {
    const dialogRef = this.formDialog.open(BlockComponent,
      {
        width: '600px'
      });
    dialogRef.afterClosed().subscribe(result => {
    	console.log(result);
  	    this.router.navigate(['/admin/paiement','prix', result]);
    });
  }
  fetchAllBlock(){
      this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
      .subscribe((data: any)=> {
  	  this.detailBlock = data.body;    
  	  console.log(this.detailBlock) ;
    });
  }
}
