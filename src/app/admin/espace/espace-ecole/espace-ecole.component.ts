import { Component, OnInit } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { AdminCover } from '../../../shared/views_models/admin-cover';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';

@Component({
  selector: 'app-espace-ecole',
  templateUrl: './espace-ecole.component.html',
  styleUrls: ['./espace-ecole.component.scss']
})
export class EspaceEcoleComponent implements OnInit {
  top_zone: AdminTopZone = null;
  detailblock: Detailblock;
  detailblocks: Detailblock[];
  coverModel: AdminCover;
  type_espace: string;

  constructor(private abonneService: AbonnesService) {
  this.getDetailBlock(); 
  	this.top_zone = new AdminTopZone (
  		'', 
  		'',
  		[
  			new Navs('Accueil', '/admin'),
  			new Navs('Espace', '/admin/paiement/espace'),
  		],
  		new Navs (this.type_espace, ''),
  		'home',
  	);

    this.coverModel = new AdminCover('',this.type_espace);
   }

  ngOnInit() {

  }
  getDetailBlock(){
  	this.abonneService.getAbonnesByLog(localStorage.getItem('log'))
    .subscribe((data: any)=> {
      this.detailblocks = data.body;      
      this.top_zone.titre = this.detailblocks[0].block.libelle;
      this.type_espace='Ecole';
      this.coverModel.titre = '';
      this.coverModel.coverPath = '/assets/profile-cover.jpg';
      this.coverModel.profilPath = '/assets/default.jpg';
      this.coverModel.vues = -1;
      this.coverModel.voirProfilLink = null;
      this.coverModel.modifLink = null;
    });
  }
}
