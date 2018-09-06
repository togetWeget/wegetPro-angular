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
import { CoverSelectComponent } from '../cover-select/cover-select.component';
import { CoverProfilComponent } from '../../comp/cover-profil/cover-profil.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';  
import { Observable, throwError, interval } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-layout-compte',
  templateUrl: './layout-compte.component.html',
  styleUrls: ['./layout-compte.component.scss']
})
export class LayoutCompteComponent implements OnInit {
top_zone: AdminTopZone = null;
  detailblock: Detailblock;
  coverModel: AdminCover;
  membre: Membre;
      @ViewChild(CoverProfilComponent) cover: CoverProfilComponent;

  constructor(private abonneService: AbonnesService,
    private membreService: MembreService,public dialog: MatDialog) {
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
    this.membreService.getMembreByLogin(localStorage.getItem('log'))
    .pipe(
      tap((data: any)=> {
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
          )
    );
  }

  openModif() {
    this.dialog.open(CoverSelectComponent, {
      maxWidth: '700px',
      data: {}
    });
  }

  handleClick(event) {
    switch (event) {
      case "modif":
        this.openModif();
        break;
      case "voirProfil":
        // code...
        break;
      
      default:
        // code...
        break;
    }
  }
}
