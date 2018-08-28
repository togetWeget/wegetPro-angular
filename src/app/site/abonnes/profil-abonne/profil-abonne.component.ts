import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {MatDialog} from '@angular/material';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import {Detailblock} from '../../../shared/models/detailblock';

@Component({
  selector: 'app-profil-abonne',
  templateUrl: './profil-abonne.component.html',
  styleUrls: ['./profil-abonne.component.scss']
})
export class ProfilAbonneComponent implements OnInit {
  abonne: Detailblock;
  abonnes: Detailblock[] = [];

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
  onContactAbonne(): void {
    const dialogRef = this.contactDialog.open(ContactAbonneComponent,
      {
        width: '600px',
        data: {idPersonne: this.abonne.personne.id, nomPersonne: this.abonne.personne.nomComplet}
      });
  }
}
