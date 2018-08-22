import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { WidgetInfo } from '../../shared/views_models/widget-info';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  top_zone: AdminTopZone = null;
  widget1: WidgetInfo = null;
  widget2: WidgetInfo = null;
  widget3: WidgetInfo = null;
  widget4: WidgetInfo = null;

  constructor() {
  	this.top_zone = new AdminTopZone (
  		'Tableau de bord', 
  		'Tableau de bord',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Tableau de bord', ''),
  		'home',
  	);

  	this.widget1 = new WidgetInfo (
  		'Nombre de visiteurs',
  		5,
  		'user',
  		'blue',
  		''
  	);
  	this.widget2 = new WidgetInfo (
  		'Nombre de messages reçus',
  		2,
  		'envelope',
  		'red',
  		''
  	);
  }

  ngOnInit() {
  }

}
