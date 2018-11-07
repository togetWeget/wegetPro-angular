import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {AdminCard} from '../../../shared/views_models/admin-card';
import {OutilsService} from '../../../core/services/outils.service';
import {SaveFilesComponent} from '../../../core/comp/save-files/save-files.component';
import {SaveFile2Component} from '../../../core/comp/save-file2/save-file2.component';
import {PersonalButton} from '../../../shared/views_models/personal-button';
import {SousBlock} from '../../../shared/models/sous-block';
import {SousBlockService} from '../../../core/services/sous-block.service';
import { Resultat } from '../../../shared/models/resultat';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';

@Component({
  selector: 'app-entete-ecole',
  templateUrl: './entete-ecole.component.html',
  styleUrls: ['./entete-ecole.component.scss']
})
export class EnteteEcoleComponent implements OnInit {

  enteteForm: FormGroup;
  admin_card: AdminCard;
  sousBlock: SousBlock;
  id_block: number = 0;
  params: ParamsModel[] = [];
  sousBlocks$: Observable<Resultat<SousBlock>>;
  sousBlocksSubject$ = new BehaviorSubject<string>('');

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    public outils: OutilsService, private sousBlockS: SousBlockService,
    private route: ActivatedRoute,
   private router: Router) {
  	this.admin_card = new AdminCard('liste des entêtes', null, 
      [new PersonalButton(
        'ajout',
        'Nouvelle entête',
        'plus',
        null,
        'blue'
      )]
      );
    this.sousBlocks$ = this.sousBlockS.streamSousBlockById(this.id_block);
    // this.sousBlocks$ = this.sousBlocksSubject$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap(data => this.sousBlockS.getSousBlockByIdDetailBlock(this.id_block))
    //   );
  }

  search(){
    this.sousBlocksSubject$.next(Date.now()+'');
  }

  ngOnInit() {
  	this.initForm();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id_block = +params.get('id');
        return this.sousBlockS.getSousBlockByIdDetailBlock(this.id_block);
      })
      ).subscribe(resp => {
        this.sousBlock = resp.body;
        this.setParams();
        // this.search();
        this.sousBlocks$ = this.sousBlockS.streamSousBlockById(this.id_block);
      });
  }

  initForm(){
  	this.enteteForm = this.fb.group({

  	});
  }

  setParams(){
    this.params = [
      new ParamsModel('id', this.sousBlock.id+'')
    ];
  }

  handleClick(event){
    switch (event) {
      case "ajout":
        this.openAjout();
        break;
      
      default:
        // code...
        break;
    }
  }

  openAjout() {
    const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: true, accept: 'image/*', 
      must_return: false, filename: this.sousBlock.nom, params: this.params,
      url: `${this.outils.getBaseUrl()}/sousBlockphotoCouverture`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sousBlockS.refreshStreamSousBlockById(this.id_block);
    });
  }
}
