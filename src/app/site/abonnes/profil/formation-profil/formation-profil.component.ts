import { Component, OnInit, Input } from '@angular/core';
import {AbonnesService} from '../../../../core/services/abonnes/abonnes.service';
import {CursusScolaire} from '../../../../shared/models/personne/cv-personne/cursusScolaire';

@Component({
  selector: 'app-formation-profil',
  templateUrl: './formation-profil.component.html',
  styleUrls: ['./formation-profil.component.scss']
})
export class FormationProfilComponent implements OnInit {
  @Input('cursus') cursus:CursusScolaire [];
  constructor() { }

  ngOnInit() {
  }

}
