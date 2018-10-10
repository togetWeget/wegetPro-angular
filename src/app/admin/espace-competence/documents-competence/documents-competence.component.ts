import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { OutilsService } from '../../../core/services/outils.service';
import { DocumentAddComponent } from '../../espace-competence/document-add/document-add.component';
import { UploadDoc } from '../../../shared/models/upload-doc';
import { AdminCard } from '../../../shared/views_models/admin-card';
import { PersonalButton } from '../../../shared/views_models/personal-button';
import { SaveFilesComponent } from '../../../core/comp/save-files/save-files.component';

@Component({
  selector: 'app-documents-competence',
  templateUrl: './documents-competence.component.html',
  styleUrls: ['./documents-competence.component.scss']
})
export class DocumentsCompetenceComponent implements OnInit {
  uploadDocs: UploadDoc[]=[];
 @Input() active:boolean =false;
 admin_card: AdminCard;

  constructor(private fb: FormBuilder, public outils: OutilsService, private dialog: MatDialog) { 
    this.admin_card = new AdminCard(
      'Mes documents',
      null, 
      [
      new PersonalButton('ajout', 'Ajouter', 'plus', null, 'blue')
      ]
      )
  }

  ngOnInit() {


  }

  // ajouterDocument() { 
  //   this.active=true;
  // }

  handleCardClick(event){
    switch (event) {
      case "ajout":
        this.ajouterDocument();
        break;
      
      default:
        // code...
        break;
    }
  }

  ajouterDocument() {
    const dialogRef = this.dialog.open(DocumentAddComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: false, type: 'image/*', filename: 'this.membre.login', url: `${this.outils.getBaseUrl()}/ph`}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    });
  }

  choseFile(){
   const dialogRef = this.dialog.open(SaveFilesComponent, {
      maxWidth: '768px',
      maxHeight: '500px',
      data: {name: 'image_photo', multiple: true, type: '.pdf, .doc, .docx', filename: 'this.membre.login', url: `${this.outils.getBaseUrl()}/ph`}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.search(Date.now()+'');
      // this.search(localStorage.getItem('log'));
    }); 
  }

}
