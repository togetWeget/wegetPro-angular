import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AbonnesService} from '../../../../core/services/abonnes/abonnes.service';
import {Detailblock} from '../../../../shared/models/detailblock';

@Component({
  selector: 'app-bio-profil',
  templateUrl: './bio-profil.component.html',
  styleUrls: ['./bio-profil.component.scss']
})
export class BioProfilComponent implements OnInit {
  @Input('abonne') abonne:Detailblock;
  constructor() { }

  ngOnInit() {
  }

}
