import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { AdminCard } from '../../shared/views_models/admin-card';
import { AdminTarif } from '../../shared/views_models/admin-tarif';
import { Block } from '../../shared/models/Block.model';
import { Tarif } from '../../shared/models/tarif/tarif';
import { PersonalButton } from '../../shared/views_models/personal-button';
import {BlockService} from '../../core/services/blocks/block.service';
import * as $ from 'jquery'; 
window["$"] =$; 
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";

@Component({
  selector: 'app-super-admin-block-tarifs',
  templateUrl: './block-tarifs.component.html',
  styleUrls: ['./block-tarifs.component.scss']
})
export class BlockTarifsComponent implements OnInit {

  top_zone: AdminTopZone = null;
  admin_card: AdminCard = null;
  editor_options: Object = {
	  height: 150,
	  toolbarButtons: [
	  'fullscreen', 
	  'bold', 
	  'italic', 
	  'underline', 
	  'strikeThrough', 
	  '|', 
	  'fontFamily', 
	  'fontSize', 
	  'color', 
	  '|', 
	  'paragraphFormat', 
	  'align', 
	  '|', 
	  'specialCharacters', 
	  'insertHR', 
	  '|', 
	  'html', 
	  '|', 
	  'undo', 
	  'redo']
	};
  tarifs: Tarif[] = [];

  constructor(private blockService: BlockService) {
  	this.top_zone = new AdminTopZone (
  		'Block', 
  		'Grille tarifaire',
  		[
  			new Navs('Accueil', '/super/admin'),
  			new Navs('Blocks', '/super/admin/blocks'),
  		],
  		new Navs ('Modifier', ''),
  		'home',
  	);

  	this.admin_card = new AdminCard(
  		'Grille tarifaire du block',
  		'',
  		[
  			new PersonalButton ('Ajouter une formule', 'plus', '/super/admin', 'green')
  		]
  		);
	this.tarifs = [
	  new Tarif (null,null, '4000', '', null, null),
	  new Tarif (null,null, '2000', '', null, null),
	  new Tarif (null,null, '1000', '', null, null),
	  new Tarif (null,null, '3000', '', null, null),
	];  	
  }

  ngOnInit() {
  }
}
