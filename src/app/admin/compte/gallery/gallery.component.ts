import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatdiologComponent} from './matdiolog/matdiolog.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
public uri: any;
  name: string;
  constructor(public dialog: MatDialog) { }

  
  
  openDialog(): void {
    const dialogRef = this.dialog.open(MatdiologComponent, {
      width: '80%',
	  height: '500px',
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


