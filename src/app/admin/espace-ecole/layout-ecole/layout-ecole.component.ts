import { Component, OnInit } from '@angular/core';
import { Router,ParamMap,ActivatedRoute } from '@angular/router';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { AdminCover } from '../../../shared/views_models/admin-cover';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {OutilsService} from '../../../core/services/outils.service';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import { SaveFile2Component } from '../../../core/comp/save-file2/save-file2.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';  

import {SousBlock} from '../../../shared/models/sous-block';
import {SousBlockService} from '../../../core/services/sous-block.service';

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
  sousBlock: SousBlock;
  id_block: number = 0;
  sousBlocks$: Observable<Resultat<SousBlock>>;
  sousBlocksSubject$ = new BehaviorSubject<string>('');

  constructor(
    private abonneService: AbonnesService,
    private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog,
    public outils: OutilsService, private sousBlockS: SousBlockService) {
  this.getDetailBlock(); 
    this.sousBlocks$ = this.sousBlocksSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(data => this.sousBlockS.getSousBlockByIdDetailBlock(this.id_block))
      );
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
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id_block = +params.get('id');
        return this.sousBlockS.getSousBlockByIdDetailBlock(this.id_block);
      })
      ).subscribe(resp => {
        this.sousBlock = resp.body;
        this.search();
      });
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

  search(){
    this.sousBlocksSubject$.next(Date.now()+'');
  }

  saveCover() {
    const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: true, filename: '', url: ``}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    });
  }
  saveProfil() {
    const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, accept: 'image/*', filename: this.sousBlock.nom, 
      url: `${this.outils.getBaseUrl()}/sousBlockLogo`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    });
  }

  test(files: File[]){
    console.log('MES FICHIERS', files);
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
