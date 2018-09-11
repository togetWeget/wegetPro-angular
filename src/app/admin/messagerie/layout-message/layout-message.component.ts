import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';

@Component({
  selector: 'app-layout-message',
  templateUrl: './layout-message.component.html',
  styleUrls: ['./layout-message.component.scss']
})
export class LayoutMessageComponent implements OnInit {
  top_zone: AdminTopZone = null;
  //maxMsg:number;

  constructor() {
  	this.top_zone = new AdminTopZone (
  		'Messagerie', 
  		'Messagerie',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Messagerie', ''),
  		'home',
  	);
  }

  ngOnInit() {
  }

}
