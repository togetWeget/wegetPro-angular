import { Component, OnInit, Input } from '@angular/core';
import { SousBlock } from '../../../shared/models/sous-block';

@Component({
  selector: 'app-detail-ecole',
  templateUrl: './detail-ecole.component.html',
  styleUrls: ['./detail-ecole.component.scss','../../abonnes/profil-abonne/profil-abonne.component.scss']
})
export class DetailEcoleComponent implements OnInit {
  @Input('detail') detail: SousBlock;

  constructor() { }

  ngOnInit() {
  }

}
