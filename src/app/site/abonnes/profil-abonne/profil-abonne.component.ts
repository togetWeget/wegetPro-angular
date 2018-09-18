import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {MatDialog} from '@angular/material';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import {Detailblock} from '../../../shared/models/detailblock';
import { CursusScolaire } from '../../../shared/models/personne/cv-personne/cursusScolaire';
import { Experience } from '../../../shared/models/personne/cv-personne/experience';

@Component({
  selector: 'app-profil-abonne',
  templateUrl: './profil-abonne.component.html',
  styleUrls: ['./profil-abonne.component.scss']
})
export class ProfilAbonneComponent implements OnInit {
  abonne: Detailblock;
  cursus: CursusScolaire[]=[];
  experience: Experience[]=[];
  abonnes: Detailblock[] = [];
  defaultPhoto: any = '/assets/profile-cover.jpg';

  constructor(private abonnesService: AbonnesService,
              private route: ActivatedRoute,
              private router: Router,
              private contactDialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getProfilById(+params.get('id')))
    ).subscribe(res => {
      this.abonne = res.body;
      this.cursus = this.abonne.membre.cvPersonne.cursus;
    });
  }
fethcAllAbonnes() {
  this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this.abonnesService.getAllAbonnesByBlock(+params.get('this.abonne.block.id')))
  ).subscribe(res => {
    this.abonnes = res.body;
    console.log('les abonnes de ListAbonnesBlockComponent', res.body);
  });
}
getPhotoSrc(): string {
  return (this.abonne.membre.pathPhotoCouveture!== null && 
    this.abonne.membre.pathPhotoCouveture !== undefined && this.abonne.membre.pathPhotoCouveture!== '') ? 
    this.abonne.membre.pathPhotoCouveture : 
    this.defaultPhoto;
}
  onContactAbonne(): void {
    const dialogRef = this.contactDialog.open(ContactAbonneComponent,
      {
        width: '600px',
        data: {idPersonne: this.abonne.membre.id, nomPersonne: this.abonne.membre.nomComplet}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
