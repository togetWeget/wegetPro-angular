import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AdminCard} from '../../../shared/views_models/admin-card';
import {OutilsService} from '../../../core/services/outils.service';
import {SaveFilesComponent} from '../../../core/comp/save-files/save-files.component';
import {PersonalButton} from '../../../shared/views_models/personal-button';

@Component({
  selector: 'app-entete-ecole',
  templateUrl: './entete-ecole.component.html',
  styleUrls: ['./entete-ecole.component.scss']
})
export class EnteteEcoleComponent implements OnInit {

  enteteForm: FormGroup;
  admin_card: AdminCard;

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    public outils: OutilsService) {
  	this.admin_card = new AdminCard('liste des entêtes', null, 
      [new PersonalButton(
        'ajout',
        'Nouvelle entête',
        'plus',
        null,
        'blue'
      )]
      );
  }

  ngOnInit() {
  	this.initForm();
  }

  initForm(){
  	this.enteteForm = this.fb.group({

  	});
  }

  handleClick(event){
    switch (event) {
      case "ajout":
        this.openAjout();
        break;
      
      default:
        // code...
        break;
    }
  }

  openAjout() {
    const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: true, type: 'image/*', filename: 'this.membre.login', url: `${this.outils.getBaseUrl()}/azsq`}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    });
  }

}
