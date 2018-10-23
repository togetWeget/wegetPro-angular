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
import {InfoMembreService} from '../../../../../core/services/info-membre/info-membre.service';
import {OutilsService} from '../../../../../core/services/outils.service';




@Component({
  selector: 'app-imgloard',
  templateUrl: './imgloard.component.html',
  styleUrls: ['./imgloard.component.scss']
})
export class ImgloardComponent implements OnInit {
	ImgVars : any = [];
	public description : any;
	public titre : any;
	public datafiles : any = [];
	public extensionValid = ["jpeg","JPEG","jpg","JPG","png","PNG","ico","ICO","icon","ICON","icone","ICONE","gif","GIF"];
  constructor(
    public dialogRef: MatDialogRef<ImgloardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _sanitizer: DomSanitizer, private http: HttpClient,
     private handleError: HttpHandler, public infoM: InfoMembreService, public outils: OutilsService) {
		
	this.onloarded();
	}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
	onloarded(){
	  	$(document).ready(()=>{
		
		$("#lorded").html("Glissez Deposer des images ici...");
		
		});	
	}
  ngOnInit() {
  }
  

	  
	  // supprimer une image avant envoi
	  
		RemoveItemTab(removeItem){
			let i = $.inArray(removeItem,this.ImgVars)
			if (i >= 0){
				this.ImgVars.splice(i, 1);
				this.datafiles.splice(i, 1);
			}else{
				$("#lorded").html("Glissez Deposer des images ici...");
			}
			// alert(this.ImgVars.length);
			if(this.ImgVars.length === 0){
				$("#lorded").html("Glissez Deposer des images ici...");
				}
		  
		  }
	returnImgExte(name : any): boolean{
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
				if(file.target.files.length > 0){
					
					let compt = file.target.files.length;
					// console.log(file.target.files);
					for(let i=0; i< compt; i++){
					if(this.returnImgExte(file.target.files[i].name)){
							this.datafiles.push(file.target.files[i]);
							this.ImgVars.push(this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file.target.files[i]))); 
					}
					} 	
					$("#lorded").html("");
					this.ImgVars.reverse();
					this.datafiles.reverse();
					// this.datafiles.push(file.target.files);
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
		// ev.target.appendChild(document.getElementById(data));

		let compt = data.files.length;
		for(let i=0; i< compt; i++){
		
			if(this.returnImgExte(data.files[i].name)){
				this.datafiles.push(data.files[i]);
				this.ImgVars.push(this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data.files[i])));  
			}
			
		}
		// this.datafiles.push(data.files);
				$("#lorded").html("");
				this.ImgVars.reverse();
				this.datafiles.reverse();
		
	  }
	  
	  
	sendphotosInfo(){
	

				const dataload : any = {membre: this.infoM.InfoMembres, libelle : this.titre, description : this.description};				
				
				console.log(this.infoM.InfoMembres);
				$.ajax({
					url:`${this.outils.getBaseUrl()}/gallery`,
					type:'post',
					contentType: 'application/json',
					dataType: 'json',
					data:JSON.stringify(dataload),
					success: (data, status)=>{
						console.log(status);
						console.log(data);
						},
						error: (error, status, msg)=>{
							console.log('1' + error);
							console.log(status);
							console.log('3' + msg);
							
							}
					});
				console.log(" fin chargement...");
   
		
	}
	
	
	sendphotos():Observable<any>{
	
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
