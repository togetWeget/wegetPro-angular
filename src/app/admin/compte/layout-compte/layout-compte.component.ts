import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminTopZone } from '../../../shared/views_models/admin-top-zone';
import { Navs } from '../../../shared/views_models/navs';
import { AdminCover } from '../../../shared/views_models/admin-cover';
import { Detailblock } from '../../../shared/models/detailblock';
import { Resultat } from '../../../shared/models/resultat';
import { Personne } from '../../../shared/models/personne/membres/personne';
import { Membre } from '../../../shared/models/personne/membres/membre';
import { AbonnesService } from '../../../core/services/abonnes/abonnes.service';
import {MembreService} from '../../../core/services/personne/membre/membre.service';
import { CoverProfilComponent } from '../../comp/cover-profil/cover-profil.component';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';
import { SaveFile2Component } from '../../../core/comp/save-file2/save-file2.component';
import { OutilsService } from '../../../core/services/outils.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';  
import { Observable, throwError, interval,
Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap, map,
debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LnlFilesManagerService, ParamsModel, FileManagerModel } from 'lnl-files-manager';

@Component({
  selector: 'app-layout-compte',
  templateUrl: './layout-compte.component.html',
  styleUrls: ['./layout-compte.component.scss']
})
export class LayoutCompteComponent implements OnInit {
  top_zone: AdminTopZone = null;
  detailblock: Detailblock;
  coverModel: AdminCover;
  params: ParamsModel[] = [];
  membre: Membre;
  membre$ : Observable<Resultat<Membre>>;
  membreSubject$ = new BehaviorSubject<string>('');

  constructor(private abonneService: AbonnesService,
    private membreService: MembreService,public dialog: MatDialog,
    public outils: OutilsService) {
    
    // this.membre$ = this.membreService.getMembreByLogin(localStorage.getItem('log'));
    // this.membre$ = this.membreSubject$
    //   .debounceTime(500)
    //   .distinctUntilChanged()
    //   .switchMap(login => login ? this.membreService.getMembreByLogin(login) :  
    //     this.membreService.getMembreByLogin(localStorage.getItem('log')));
        
    this.membre$ = this.membreSubject$.pipe(
      debounceTime(500),
      // distinctUntilChanged(),
      switchMap(login => login ? this.membreService.getMembreByLogin(login) :  
        this.membreService.getMembreByLogin(localStorage.getItem('log')))
      );
    this.search(localStorage.getItem('log'));
    // console.log(this.membre$);
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

  handlImageChange(event){
    this.search(event);
  }

  ngOnInit() {    
    this.getDetailBlock();
  }

  search(login: string){
    this.membreSubject$.next(login);
  }

  getDetailBlock() {
    this.membre$.subscribe(
      (data: any)=> {
            this.membre = data.body;     
            this.top_zone.titre = this.membre.nomComplet;
            this.coverModel.titre = '';
            this.coverModel.coverPath = '/assets/profile-cover.jpg';
            this.coverModel.profilPath = this.membre.pathPhoto;
            this.coverModel.vues = '-1';
            this.coverModel.voirProfilLink = null;
            this.coverModel.modifLink = null;
            this.coverModel.vues = this.membre.nombreVue;
            // console.log(this.coverModel.profilPath);
            // this.cover.img_profil.nativeElement.style.backgroundImage = this.coverModel.profilPath;
            // this.cover.load
            }
    );
  }

  setParams(){
    this.params = [];
    this.params = [
      new ParamsModel('membre_login', <string> this.membre.login)
    ];
  }

  openModif() {
    this.setParams();
    const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, accept: 'image/*', 
      filename: this.membre.login, params: this.params,
       url: `${this.outils.getBaseUrl()}/photoCouvertureMembre`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search(Date.now()+'');
      this.search(localStorage.getItem('log'));
    });
  }

  onContactAbonne(){
    
  }

  saveProfil() {
    this.setParams();
    const dialogRef = this.dialog.open(SaveFile2Component, {
      maxWidth: '768px',
      maxHeight: '500px',
      // data: {name: 'image_photo', multiple: true, filename: 'this.membre.login', accept: '', url: `${this.outils.getBaseUrl()}/photoMembre`}
      data: {name: 'image_photo', multiple: false, accept: 'image/*', 
      filename: this.membre.login, params: this.params,
      url: `${this.outils.getBaseUrl()}/photoMembre`}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search(Date.now()+'');
      this.search(localStorage.getItem('log'));
    });
  }

  handleClick(event) {
    switch (event) {
      case "img_cover":
        this.openModif();
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
