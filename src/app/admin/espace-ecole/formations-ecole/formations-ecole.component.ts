import { Component, OnInit } from '@angular/core';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { PersonalButton } from '../../../shared/views_models/personal-button';

@Component({
  selector: 'app-formations-ecole',
  templateUrl: './formations-ecole.component.html',
  styleUrls: ['./formations-ecole.component.scss']
})
export class FormationsEcoleComponent implements OnInit {
  admin_card: AdminCard;
  
  constructor() {
  	this.admin_card = new AdminCard(
  		'Tout les programmes',
  		null,
  		[
  		new PersonalButton(
			'ajout',
			'nouvelle formation',
			'plus',
			'',
			'blue',
			)
  		],
  		);
  }

  ngOnInit() {
  }

  handleClick(ev){

  }

}
