import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { AdminCard } from '../../shared/views_models/admin-card';
import { AdminTable } from '../../shared/views_models/admin-table';
import { Abonnes } from '../../shared/models/abonnes';
import { Detailblock } from '../../shared/models/detailblock';
import { AbonnesService } from '../../core/services/abonnes/abonnes.service';
import { Personne } from '../../shared/models/personne/membres/personne';
import { Block } from '../../shared/models/block';

@Component({
  selector: 'app-abonnes',
  templateUrl: './abonnes.component.html',
  styleUrls: ['./abonnes.component.scss']
})
export class AbonnesComponent implements OnInit {
  top_zone: AdminTopZone = null;
  admin_card: AdminCard = null;
  abonnes: Detailblock[] = [];
  p: number = 1;
  per_page: number;

  constructor(private abonnesServices: AbonnesService) {
  	this.top_zone = new AdminTopZone (
  		'Abonnés', 
  		'Liste des abonnés enregistrés',
  		[
  			new Navs('Accueil', '/super/admin'),
  		],
  		new Navs ('Liste', ''),
  		'home',
  	);

    this.admin_card = new AdminCard(
      'Liste de tous les abonnés',
      '/super/admin/abonnes/add'
      );

    this.abonnesServices.getAllAbonnes()
    .subscribe(data => {
        this.abonnes = data.body;
      });
  }

  setPerPage(pp: number) {
    this.per_page = pp;
  }

  ngOnInit() {
  }

}
