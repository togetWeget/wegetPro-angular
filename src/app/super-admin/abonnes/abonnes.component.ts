import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';

@Component({
  selector: 'app-abonnes',
  templateUrl: './abonnes.component.html',
  styleUrls: ['./abonnes.component.scss']
})
export class AbonnesComponent implements OnInit {
  top_zone: AdminTopZone = null;

  constructor() {
  	this.top_zone = new AdminTopZone (
  		'Abonnés', 
  		'Liste des abonnés enregistrés',
  		[
  			new Navs('Accueil', '/super/admin'),
  		],
  		new Navs ('Liste', ''),
  		'home',
  	);
  }

  ngOnInit() {
  }

}
