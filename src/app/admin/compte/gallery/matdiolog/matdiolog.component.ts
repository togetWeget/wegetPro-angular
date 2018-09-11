import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  uri: any;
  name: string;
}


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-matdiolog',
  templateUrl: './matdiolog.component.html',
  styleUrls: ['./matdiolog.component.scss']
})
export class MatdiologComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatdiologComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
		left(i){
			const l = parseInt(this.data.uri);
			if(i > 1){
				this.data.uri = parseInt(i) - 1;
				}
			
		}
		
		keyleft(event: KeyboardEvent,i){
		if(event.which === KEY_CODE.LEFT_ARROW){
				if(i > 1){
				this.data.uri = parseInt(i) - 1;
				}
			}

			}



		right(i){
			const l = parseInt(this.data.uri);
			if(i < 10){
				this.data.uri = parseInt(i) + 1;
			}	
		}
		keyright(event: KeyboardEvent,i){
		alert(2);
			if(event.which === KEY_CODE.RIGHT_ARROW){
				
				if(i < 10){
					this.data.uri = parseInt(i) + 1;
				}
			}
			
		}	
		

		
}
