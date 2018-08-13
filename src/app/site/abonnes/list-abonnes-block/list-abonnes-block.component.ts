import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {AbonnesService} from '../../../core/services/abonnes/abonnes.service';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import {MatDialog} from '@angular/material';
import {Detailblock} from '../../../shared/models/detailblock';


@Component({
  selector: 'app-list-abonnes-block',
  templateUrl: './list-abonnes-block.component.html',
  styleUrls: ['./list-abonnes-block.component.scss']
})
export class ListAbonnesBlockComponent implements OnInit {
  abonnes: Detailblock[] = [];
  status: number;
  selectedAbonne: Detailblock;

  constructor(private router: Router,
              private abonnesService: AbonnesService,
              private route: ActivatedRoute,
              private contactDialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.abonnesService.getAllAbonnesByBlock(+params.get('id')))
    ).subscribe(res => {
      this.abonnes = res.body;
      console.log('les abonnes de ListAbonnesBlockComponent', res.body);
    });
  }

  getStatutMembre() {
    if (this.status === 1) {
      return 'Discuter avec cet abonné';
    } else {
      return '';
    }
  }

  onViewProfileAbonne(abonne: Detailblock) {
    this.selectedAbonne = abonne;
    this.router.navigate(['abonnes', 'profile', abonne.id]);
  }

  onContactAbonne(abonne: Detailblock): void {
    this.selectedAbonne = abonne;
    const dialogRef = this.contactDialog.open(ContactAbonneComponent,
      {
        width: '600px',
        data: {idPersonne: abonne.personne.id, nomPersonne: abonne.personne.nomComplet}
      });
  }
}
