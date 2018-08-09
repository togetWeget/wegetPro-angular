import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/internal/operators';
import {AbonnesService} from '../../services/abonnes/abonnes.service';
import {MatDialog} from '@angular/material';
import {ContactAbonneComponent} from '../contact-abonne/contact-abonne.component';
import {Detailblocks} from '../../../shared/models/detailblock';
import {ChatComponent} from '../../chat/chat.component';

export class Personne {
  id: number;
  nomComplet: string;
}

@Component({
  selector: 'app-profil-abonne',
  templateUrl: './profil-abonne.component.html',
  styleUrls: ['./profil-abonne.component.scss']
})
export class ProfilAbonneComponent implements OnInit {
  abonne: Detailblocks;
  selectAbonne: Detailblocks;
  id: number;
  nomComplet: string;
  @ViewChild(ChatComponent) chat: ChatComponent;

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
        data: {id: this.abonne.personne.id, nomCompet: this.abonne.personne.nomComplet}
      });
  }
}
