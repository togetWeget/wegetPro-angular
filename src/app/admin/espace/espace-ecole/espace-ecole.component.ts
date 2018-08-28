import { Component, OnInit } from '@angular/core';
import { Router,ParamMap,ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
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
  detailBlock: Detailblock;
  detailBlocks: Detailblock[];
  coverModel: AdminCover;
  type_espace: string;

  constructor(
    private abonneService: AbonnesService,
    private route: ActivatedRoute,
    private router: Router,) {
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
  	this.route.paramMap.pipe(
      switchMap((params : ParamMap)=>
      this.abonneService.getProfilById(+params.get('id')))
    ).subscribe(res=>{
      this.detailBlock = res.body;
        this.top_zone.titre = this.detailBlock.block.libelle;
      this.top_zone.sous_titre=this.detailBlock.block.libelle;
    });
  }
}
