import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OutilsService} from '../../../core/services/outils.service';

@Component({
  selector: 'app-formation-ecole-add',
  templateUrl: './formation-ecole-add.component.html',
  styleUrls: ['./formation-ecole-add.component.scss']
})
export class FormationEcoleAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormationEcoleAddComponent>, 
  	@Inject(MAT_DIALOG_DATA) public data, public outils: OutilsService) { }

  ngOnInit() {
  }

  onSubmit(){
  	this.dialogRef.close();
  }
}
