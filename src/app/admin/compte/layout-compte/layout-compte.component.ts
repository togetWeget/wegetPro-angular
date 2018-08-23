import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { Detailblock } from '../../../shared/models/detailblock';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';

@Component({
  selector: 'app-layout-compte',
  templateUrl: './layout-compte.component.html',
  styleUrls: ['./layout-compte.component.scss']
})
export class LayoutCompteComponent implements OnInit {
top_zone: AdminTopZone = null;
  detailblock: Detailblock;

  constructor(private abonneService: AbonnesService) {
  	this.getDetailBlock();
  	this.top_zone = new AdminTopZone (
  		'Abass Yoro', 
  		'',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Profil', ''),
  		'home',
  	);
  }

  ngOnInit() {
  }

  getDetailBlock() {
  	this.detailblock = new Detailblock();
  }
}
