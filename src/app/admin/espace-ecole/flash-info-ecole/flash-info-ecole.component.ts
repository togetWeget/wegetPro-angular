import { Component, OnInit } from '@angular/core';
import {AdminCard} from '../../../shared/views_models/admin-card';

@Component({
  selector: 'app-flash-info-ecole',
  templateUrl: './flash-info-ecole.component.html',
  styleUrls: ['./flash-info-ecole.component.scss']
})
export class FlashInfoEcoleComponent implements OnInit {

  admin_card: AdminCard;
  constructor() {
  	this.admin_card = new AdminCard('liste des fhash infos', null, null);
  }

  ngOnInit() {
  }

}
