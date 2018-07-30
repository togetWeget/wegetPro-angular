import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {AbonnesService} from '../../services/abonnes/abonnes.service';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import {MatDialog} from '@angular/material';
import {Detailblocks} from '../../../shared/models/detailblock';


@Component({
  selector: 'app-list-abonnes-block',
  templateUrl: './list-abonnes-block.component.html',
  styleUrls: ['./list-abonnes-block.component.scss']
})
export class ListAbonnesBlockComponent implements OnInit {
  abonnes: Detailblocks[] = [];
  status: number;
  selectedAbonne: Detailblocks;
  id: number;
  nomComplet: string;

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

  onViewProfileAbonne(abonne: Detailblocks) {
    this.selectedAbonne = abonne;
    this.router.navigate(['abonnes', 'profile', abonne.id]);
  }

  onContactAbonne(abonne: Detailblocks): void {
    this.selectedAbonne = abonne;
    const dialogRef = this.contactDialog.open(ContactAbonneComponent,
      {
        width: '600px',
        data: {id: abonne.personne.id, nomCompet: abonne.personne.nomComplet}
      });
  }
}
