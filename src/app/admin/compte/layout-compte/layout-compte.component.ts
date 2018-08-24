import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { AdminCover } from '../../../shared/views_models/admin-cover';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';

@Component({
  selector: 'app-layout-compte',
  templateUrl: './layout-compte.component.html',
  styleUrls: ['./layout-compte.component.scss']
})
export class LayoutCompteComponent implements OnInit {
top_zone: AdminTopZone = null;
  detailblock: Detailblock;
  detailblocks: Detailblock[];
  coverModel: AdminCover;

  constructor(private abonneService: AbonnesService) {
  	this.getDetailBlock();
  	this.top_zone = new AdminTopZone (
  		'', 
  		'',
  		[
  			new Navs('Accueil', '/admin'),
  		],
  		new Navs ('Profil', ''),
  		'home',
  	);

    this.coverModel = new AdminCover();
  }

  ngOnInit() {
  }

  getDetailBlock() {
    this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
    .subscribe((data: any)=> {
      this.detailblocks = data.body;      
      this.top_zone.titre = this.detailblocks[0].personne.nomComplet;
      this.coverModel.titre = '';
      this.coverModel.coverPath = '/assets/profile-cover.jpg';
      this.coverModel.profilPath = '/assets/default.jpg';
      this.coverModel.vues = -1;
      this.coverModel.voirProfilLink = null;
      this.coverModel.modifLink = null;
    });
  }
}
