import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import { OutilsService } from '../../../core/services/outils.service';
import { VideoEcoleAddComponent } from '../../espace-ecole/video-ecole-add/video-ecole-add.component';
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
import { LnlCgAlbumModel, LnlCoolGalleryService } from 'lnl-cool-gallery';

@Component({
  selector: 'app-video-ecole',
  templateUrl: './video-ecole.component.html',
  styleUrls: ['./video-ecole.component.scss']
})
export class VideoEcoleComponent implements OnInit {
albums: LnlCgAlbumModel[] = [];
  uploadDocs: UploadDoc[]=[];
  admin_card: AdminCard;
  params: ParamsModel[] = [];
  detailblock: Detailblock;
  membre: Membre;
  sousblock: SousBlock;
  id: number;
  photos: PhotoSousblock[] = [];
  photos$: Observable<Resultat<PhotoSousblock[]>>;
  photosSubject$ = new BehaviorSubject<string>('');
  albums$: Observable<LnlCgAlbumModel[]>;
  albumsSubject$ = new BehaviorSubject<LnlCgAlbumModel[]>(null);

  constructor(private fb: FormBuilder, public outils: OutilsService, 
    private dialog: MatDialog,
    private membreService: MembreService, 
    private sousBlockS: SousBlockService, 
    private abonnesService: AbonnesService,
    private route: ActivatedRoute, private docS: PhotoSousblockService,
    private _sanitizer: DomSanitizer, private galleryService: LnlCoolGalleryService) { 
    this.albums$ = this.albumsSubject$.asObservable();
    this.albumsSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(d => new Observable<LnlCgAlbumModel[]>((observer) => {
        observer.next(d);
      })));      

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

  searchAlbum(){
    this.docS.getAllphotosBySousBlockId(this.sousblock.id)
    .subscribe(data => {
      this.albumsSubject$.next(this.albumConverter(data.body));
    });
  }

  albumConverter(photos: PhotoSousblock[]): LnlCgAlbumModel[]{
    let albums: LnlCgAlbumModel[] = [];
    try{
      for(let ph of photos){
        if(ph.pathVideo.length > 0){
          albums.push(this.galleryService.buildAlbumModel(
            ph, null, 'libelle', 'description', 'pathVideo', 'video'));
        }
      }
    }catch(e){
      console.error(e);
    }
    return albums;
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
          this.searchAlbum();
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
  }

  ajouterphoto() {
    // alert(this.id);
    const dialogRef = this.dialog.open(VideoEcoleAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {isNew: true, id: this.id}      
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      this.search();
      this.searchAlbum();
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
