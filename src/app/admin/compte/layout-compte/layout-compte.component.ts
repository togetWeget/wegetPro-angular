import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { Membre } from '../../../shared/models/personne/membres/membre';

@Component({
  selector: 'app-layout-compte',
  templateUrl: './layout-compte.component.html',
  styleUrls: ['./layout-compte.component.scss']
})
export class LayoutCompteComponent implements OnInit {
top_zone: AdminTopZone = null;
  membre: Membre;

  constructor() {
  	this.getMembre();
  	this.top_zone = new AdminTopZone (
  		this.membre.nomComplet, 
  		'Espace stagiaire / Salarié',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Profil', ''),
  		'home',
  	);
  }

  ngOnInit() {
  }

  getMembre() {
  	this.membre = new Membre(
  		1,
  		0,
  		'cni',
  		'titre',
  		'Nom',
  		'prenom1 prenom2',
  		'password',
  		'repassword',
  		true,
  		'nomComplet',
  		'pathPhoto',
  		'type',
  		null,
  		'login',
  		null,
  		null,
  		null,
  		null,
  		'description',
  		);
  }
}
