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
ativ: string;
  
  
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
	
	
	sendphotos(){
	
	
   // $("#formContent").submit(function(e){

     // e.preventDefault();
     // var formdata = new FormData(this);

 // $.ajax({
     // url: "",
     // type: "POST",
     // data: formdata,
     // mimeTypes:"multipart/form-data",
     // contentType: false,
     // cache: false,
     // processData: false,
     // success: function(){

     // alert("successfully");

     // });
   // });
   
		
	}
}


