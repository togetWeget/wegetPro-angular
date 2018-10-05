import { Component, OnInit } from '@angular/core';
import { Router,ParamMap,ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { AdminCover } from '../../../shared/views_models/admin-cover';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';  

@Component({
  selector: 'app-layout-ecole',
  templateUrl: './layout-ecole.component.html',
  styleUrls: ['./layout-ecole.component.scss']
})
export class LayoutEcoleComponent implements OnInit {
  top_zone: AdminTopZone = null;
  detailBlock: Detailblock;
  detailBlocks: Detailblock[];
  coverModel: AdminCover;
  type_espace: string;

  constructor(
    private abonneService: AbonnesService,
    private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog) {
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

  saveCover() {
    const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: true, filename: '', url: ``}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    });
  }
  saveProfil() {
    const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, filename: '', url: ``}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    });
  }

  handleClick(event) {
    switch (event) {
      case "img_cover":
        this.saveCover();
        break;
      case "img_profil":
        this.saveProfil();
        break;
      
      default:
        // code...
        break;
    }
  }
}
