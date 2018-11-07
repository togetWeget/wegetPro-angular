import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { OutilsService } from '../../../core/services/outils.service';
import { PhotoEcoleAddComponent } from '../../espace-ecole/photo-ecole-add/photo-ecole-add.component';
import { UploadDoc } from '../../../shared/models/upload-doc';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import {SousBlockService} from '../../../core/services/sous-block.service';
import { Detailblock } from '../../../shared/models/detailblock';
import { SousBlock } from '../../../shared/models/sous-block';
import { PersonalButton } from '../../../shared/views_models/personal-button';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import { SaveFile2Component } from '../../../core/comp/save-file2/save-file2.component';
import { PhotoSousblock } from '../../../shared/models/photo-sousblock';
import { PhotoSousblockService } from '../../../core/services/photo-sousblock.service';
import { Resultat } from '../../../shared/models/resultat';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';

@Component({
  selector: 'app-photos-ecole',
  templateUrl: './photos-ecole.component.html',
  styleUrls: ['./photos-ecole.component.scss']
})
export class PhotosEcoleComponent implements OnInit {

  uploadDocs: UploadDoc[]=[];
  admin_card: AdminCard;
  active: number = 0;
  params: ParamsModel[] = [];
  detailblock: Detailblock;
  membre: Membre;
  sousblock: SousBlock;
  id: number;
  photos: PhotoSousblock[] = [];
  photos$: Observable<Resultat<PhotoSousblock[]>>;
  photosSubject$ = new BehaviorSubject<string>('');

  constructor(private fb: FormBuilder, public outils: OutilsService, 
    private dialog: MatDialog,
    private membreService: MembreService, 
    private sousBlockS: SousBlockService, 
    private abonnesService: AbonnesService,
    private route: ActivatedRoute, private docS: PhotoSousblockService,
    private _sanitizer: DomSanitizer) { 
  	this.active = 0;
    this.photos$ = this.photosSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => this.docS.getAllphotosBySousBlockId(this.sousblock.id))
      );
    this.admin_card = new AdminCard(
      'Albums',
      null, 
      [
      new PersonalButton('ajout', 'Ajouter', 'plus', null, 'blue')
      ]
      )
    this.sousblock = new SousBlock();
  }

  sanitize(value: string): any{
    return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>{
       this.id = +params.get('id');
     return this.sousBlockS.getSousBlockByIdDetailBlock(this.id)
     })
    ).subscribe(res=> {
      this.sousblock = res.body;  
      this.docS.getAllphotosBySousBlockId(this.sousblock.id)
      .subscribe(data => {
        try{
          this.photos = data.body;
          this.search();
        }catch(e){}
        // console.log("doc", data.body);
      });
      // if (res.status===0) {
      //      // this.initForm();
      //    }   
    });   

  }


   handleCardClick(event){
    switch (event) {
      case "ajout":
        this.ajouterphoto();
        break;
      
      default:
        // code...
        break;
    }
  }

  search(){
    this.photosSubject$.next(Date.now()+'');
    this.active = 0;
  }

  ajouterphoto() {
    // alert(this.id);
    const dialogRef = this.dialog.open(PhotoEcoleAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {isNew: true, id: this.id}      
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      this.search();
      // this.search(localStorage.getItem('log'));
    });
  }
   setParams(id: number){
    this.params = [];
    this.params = [
      new ParamsModel('id', id+'')
    ];
  }
}
