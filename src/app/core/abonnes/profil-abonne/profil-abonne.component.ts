import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {AbonnesService} from '../../services/abonnes/abonnes.service';
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

  constructor(private abonnesService: AbonnesService,
              private route: ActivatedRoute,
              private router: Router,
              private contactDialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getAbonnesById(+params.get('id')))
    ).subscribe(res => {
      this.abonne = res.body;
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
