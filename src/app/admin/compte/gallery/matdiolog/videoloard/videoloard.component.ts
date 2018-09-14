import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
export interface DialogData {
  ImgVar: any;
  name: string;
}
import { HttpClient, HttpHeaders , HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';


@Component({
  selector: 'app-videoloard',
  templateUrl: './videoloard.component.html',
  styleUrls: ['./videoloard.component.scss']
})
export class VideoloardComponent implements OnInit {

ImgVars : any = [];
	public description : any;
	public titre : any;
	public datafiles : any = [];
	public extensionValid = ["3gp","3GP","mp4","MP4","avi","AVI","webm","WEBM"];

	public textaltern = "Glissez Deposer une video ici...";
	
  constructor(
    public dialogRef: MatDialogRef<VideoloardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _sanitizer: DomSanitizer, private http: HttpClient, private handleError: HttpHandler) {
		
	this.onloarded();
	}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
	onloarded(){
	  	$(document).ready(()=>{
		
		$("#lorded").html(this.textaltern);
		
		});	
	}
  ngOnInit() {
  }
  

	  
	  // supprimer une image avant envoi
	  
		RemoveItemTab(removeItem){
			let i = $.inArray(removeItem,this.ImgVars)
			if (i >= 0){
				this.ImgVars.splice(i, 1);
			}else{
				$("#lorded").html(this.textaltern);
			}
			// alert(this.ImgVars.length);
			if(this.ImgVars.length === 0){
				$("#lorded").html(this.textaltern);
				}else{
				
				$("#lorded").html("");
				}
		  
		  }
	
	returnVidExte(name : any): boolean{
					let extend = name.split(".");
					let endExetend = extend[extend.length - 1];
					// console.log(endExetend);
					let i = $.inArray(endExetend,this.extensionValid);
					if (i >= 0){
						return true;
					}else{
						return false;
					}
		
	}
		  
	recupimg(file){
	let h= 0;
				if(file.target.files.length > 0){
					
					let compt = file.target.files.length;
					for(let i=0; i< compt; i++){
						if(this.returnVidExte(file.target.files[i].name)){
								this.datafiles.push(file.target.files[i]);
								this.ImgVars.push(this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file.target.files[i]))); 
								h++;
						}
					} 
					if(this.ImgVars.length === 0){ $("#lorded").html(this.textaltern);}	
					if(h > 0){
						$("#lorded").html("");
					}else{
						$("#lorded").html(this.textaltern);
					}
						this.ImgVars.reverse();
					// this.datafiles.push(file.target.files);
					}else{
						$("#lorded").html(this.textaltern);
					}

	}
	
	

	  allowDrop(ev) {
		ev.preventDefault();
	  }

	  drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	  }

	  drop(ev) {
		ev.preventDefault();
		let data = ev.dataTransfer;
		let h = 0;
		// ev.target.appendChild(document.getElementById(data));

		let compt = data.files.length;
		if(compt > 0){
			for(let i=0; i< compt; i++){
				if(this.returnVidExte(data.files[i].name)){
					this.datafiles.push(data.files[i]);
					this.ImgVars.push(this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data.files[i])));  
					h++;
				}
			}
			if(this.ImgVars.length === 0){ $("#lorded").html(this.textaltern);}
			if(h > 0){
						$("#lorded").html("");
					}else{
						$("#lorded").html(this.textaltern);
					}
			// this.datafiles.push(data.files);
				$("#lorded").html("");
				this.ImgVars.reverse();
		}else{
			$("#lorded").html(this.textaltern);
		}
	  }
	  
	  
	sendvideo():Observable<any>{
	
			 const formdata = new FormData();
				 formdata.append( 'files', this.datafiles);
				 formdata.append( 'titre' , this.titre);
				 formdata.append( 'description' , this.description);
				// const dataload : any = { titre : this.titre, description : this.description, files: formdata};				
				const httpOptions = {
				  headers: new HttpHeaders({
					  'Content-Type':  'multipart/form-data;boundary='+Math.random(),
					'Authorization': 'my-auth-token',
					'Accept': 'application/json'
				  })
				};
				
				
				return this.http.post(".", formdata, httpOptions)
				.pipe(
					map((data: any[]) => {
					
					return true;
					
				}), catchError( error => {
					return throwError( 'Something went wrong!' );
				})
				);
   
		
	}

}

