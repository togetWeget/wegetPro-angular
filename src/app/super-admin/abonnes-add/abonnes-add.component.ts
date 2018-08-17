import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../shared/views_models/admin-top-zone';
import { Navs } from '../../shared/views_models/navs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminCard } from '../../shared/views_models/admin-card';
import { AdminTable } from '../../shared/views_models/admin-table';
import { Abonnes } from '../../shared/models/abonnes';
import { Membre } from '../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../core/services/abonnes/abonnes.service';
import { Personne } from '../../shared/models/personne/membres/personne';
import { Block } from '../../shared/models/block';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'; 
window["$"] =$; 
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";


@Component({
  selector: 'app-abonnes-add',
  templateUrl: './abonnes-add.component.html',
  styleUrls: ['./abonnes-add.component.scss']
})
export class AbonnesAddComponent implements OnInit {
  top_zone: AdminTopZone = null;
  admin_card: AdminCard = null;
  abonnes: Abonnes[] = [];
  editor_options: Object = {
	  height: 250
	};
  abonneForm: any;

  constructor(private abonnesServices: AbonnesService,private fb: FormBuilder,
  	private toastr: ToastrService, private router: Router) { 
  	this.top_zone = new AdminTopZone (
  		'Abonnés', 
  		'Ajouter un abonné',
  		[
  			new Navs('Accueil', '/super/admin'),
  			new Navs('Abonnés', '/super/admin/abonnes'),
  		],
  		new Navs ('Liste', ''),
  		'home',
  	);

    this.admin_card = new AdminCard(
      'Ajouter un abonné'
      );

    this.initForm();
  }

  ngOnInit() {
  	let abonne = new Abonnes (new Personne ());
  	this.abonneForm = this.fb.group({
	  	// id: [abonne.personne.id],
	  	// version: [abonne.personne.version],
	  	// cni: [abonne.personne.cni],
	  	// titre: [abonne.personne.titre],
	  	// nom: [abonne.personne.nom],
	  	// prenom: [abonne.personne.prenom],
	  	// password: [abonne.personne.password],
	  	// repassword: [abonne.personne.repassword],
	  	// actived: [abonne.personne.actived],
	  	// nomComplet: [abonne.personne.nomComplet],
	  	// pathPhoto: [abonne.personne.pathPhoto],
	  	// type: [abonne.personne.type],
	  	// adresse: this.fb.group({
	  	// 	codePostal: [abonne.personne.adresse.codePostal],
	  	// 	quartier: [abonne.personne.adresse.quartier],
	  	// }),
	  	// login: [abonne.personne.login],
	  	// entreprise: this.fb.group({
	  	// 	type: [abonne.personne.type],
	  	// }),
	  	// typeStatut: this.fb.group({
	  	// 	type: [abonne.personne.type],
	  	// }),
	  	// cvPersonne: this.fb.group({
	  	// 	type: [abonne.personne.type],
	  	// }),
	  	// telephones: this.fb.group({
	  	// 	type: [abonne.personne.type],
	  	// }),
	  });
  }

  initForm () {

  }

  ajouterBlock() {
  	
  }

}
