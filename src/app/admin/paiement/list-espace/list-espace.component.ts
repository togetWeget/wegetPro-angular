import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog} from '@angular/material';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { Navs }  from '../../../shared/views_models/navs';
import { PersonalButton }  from '../../../shared/views_models/personal-button';
import { Detailblock } from '../../../shared/models/detailblock';
import { BlockComponent } from '../block/block.component';

@Component({
  selector: 'app-list-espace',
  templateUrl: './list-espace.component.html',
  styleUrls: ['./list-espace.component.scss']
})
export class ListEspaceComponent  implements OnInit {
	top_zone: AdminTopZone = null;
  	admin_card: AdminCard = null;
  	detailBlock: Detailblock[]=[];
	constructor(private route: ActivatedRoute,
              	private router: Router,
              	private formDialog: MatDialog) {
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

	}
	handleClick(event: string) {
		switch (event) {
			case "abonnement":
				this.onContactAbonne();
				break;
			
			default:
				// code...
				break;
		}

	}
	onContactAbonne(): void {
    const dialogRef = this.formDialog.open(BlockComponent,
      {
        width: '400px'
      });
  }

}
