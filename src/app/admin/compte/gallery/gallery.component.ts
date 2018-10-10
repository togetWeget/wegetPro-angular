import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatdiologComponent} from './matdiolog/matdiolog.component';
import {ImgloardComponent} from './matdiolog/imgloard/imgloard.component';
import {VideoloardComponent} from './matdiolog/videoloard/videoloard.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {InfoMembreService} from '../../../core/services/info-membre/info-membre.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
public uri: any;
  name: string;
  ativ: string;
  ImgVar : any = [];
  constructor(public dialog: MatDialog, private _sanitizer: DomSanitizer, public infoM: InfoMembreService) { }

  
  
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
  
  openDialogImg(): void {
    const dialogRef = this.dialog.open(ImgloardComponent, {
      width: '80%',
	  height: '86%',
      data: {name: this.name, ImgVar: this.ImgVar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.uri = result;
    });
  }
  
  
  openDialogVideo(): void {
    const dialogRef = this.dialog.open(VideoloardComponent, {
      width: '80%',
	  height: '85%',
      data: {name: this.name, ImgVar: this.ImgVar}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.uri = result;
    });
  }
  
  
  ngOnInit() {
    const urlget = document.location.href;
	let spl = urlget.split("/");
	const fib = spl[spl.length-1];
	  this.actived(fib);
  }
  
  actived(param){
	  this.ativ = param;
	  const urlget = document.location.href;
	  let spl = urlget.split("/");
	  const fib = spl[spl.length-1];		
		if(fib == param){
			this.ativ = fib;
			}
	}
	
	affichecache(){
	
		 if ( $( ".sscach" ).is( ":hidden" ) ) {
			$(".sscach").fadeIn(700);
        }else{
			$(".sscach").fadeOut(500);
        }
	}
	
	
	recuptImgs(){
      
			this.openDialogImg();    
	}
	

}


