import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatdiologComponent} from '../matdiolog/matdiolog.component';
import {InfoMembreService} from '../../../../core/services/info-membre/info-membre.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

public uri: any;
  name: string;
  constructor(public dialog: MatDialog, public infoM: InfoMembreService) { }

  
  
  openDialog(): void {
    const dialogRef = this.dialog.open(MatdiologComponent, {
      width: '80%',
	  height: '500px',
	  panelClass: 'myapp-no-padding-dialog',
      data: {name: this.name, uri: this.uri}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.uri = result;
    });
  }
  
  
  ngOnInit() {
  }
  
  geturi(param){
		this.uri = param;
		this.openDialog();
	  }
	  

	  
	  returnf(param){
		 param.stopPropagation();
		  }

}
