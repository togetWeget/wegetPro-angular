import { Component, OnInit } from '@angular/core';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { PersonalButton } from '../../../shared/views_models/personal-button';
import {MatDialog} from '@angular/material';
import {FormationEcoleAddComponent} from '../formation-ecole-add/formation-ecole-add.component';

@Component({
  selector: 'app-formations-ecole',
  templateUrl: './formations-ecole.component.html',
  styleUrls: ['./formations-ecole.component.scss']
})
export class FormationsEcoleComponent implements OnInit {
  admin_card: AdminCard;
  
  constructor(public dialog: MatDialog) {
  	this.admin_card = new AdminCard(
  		'Tout les programmes',
  		null,
  		[
  		new PersonalButton(
			'ajout',
			'Ajouter un programme',
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
  	switch (ev) {
  		case "ajout":
  			this.gotoAdd();
  			break;
  		
  		default:
  			// code...
  			break;
  	}
  }

  gotoAdd(): void {
    const dialogRef = this.dialog.open(FormationEcoleAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'ddddf'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
