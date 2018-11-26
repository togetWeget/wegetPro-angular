import { Injectable } from '@angular/core';
import {catchError, map, observeOn, tap, timeout} from 'rxjs/operators';
import {Observable, of, Subject, interval, isObservable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';
import {OutilsService} from './outils.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
public panierAll: any = {};
public panierId: any = {};
public panierdata: any = {};
public urlglobal = `${this.outils.getBaseUrl()}/panier`;
public urlAll = `${this.outils.getBaseUrl()}/panierParPersonne`;
public countPanier = 0;
<<<<<<< HEAD
public Total = 0;
public tab: any = [];
public rest: number;
  constructor(public  http: HttpClient, private outils: OutilsService, private toastr: ToastrService) {
  }
=======
  constructor(public  http: HttpClient, private outils: OutilsService) {}
>>>>>>> develop
  
   showSuccess(text, title) {
    this.toastr.success(text, title, {
		  timeOut: 5000
		}); 
  }
  showerror(text, title){
	  this.toastr.error(text, title, {
		  timeOut: 5000
		});  
  }

  
	setpanier(idBlock, idMembre, quantite, idTarif){
		let u = this;
	
			let data: any ={
					idBlock: idBlock,
					idMembre: idMembre,
					quantite: quantite,
					idTarif: idTarif
				};
				
		$.ajax({
			url:u.urlglobal,
			data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
			type:'post',
			traditional: true,
			dataType:'json',
			success: (query)=>{
				// console.log(query);
				if(query.status === 0){
					u.paniereload(idMembre);
					u.showSuccess(query.messages[0],"Panier");
				}else{
					u.showerror(query.messages[0],"Attention!");
					u.countPanier--;
				}
				},
			error: (erreur)=>{
				u.countPanier--;
				u.showerror("Une erreur est survenue. Veuillez verifier votre connexion internet et réessayer","Erreur!");
				}
			
			});
	
	  
	  }
	  
	calculprix(){
		if(this.panierId){
		let prix = 0;
			for(let i=0; i<this.panierId.length; i++ ){
					prix += parseInt(this.panierId[i].montant);
					this.Total = prix;
				}

			}

	}
	
	calculdate(){
		
		if(this.panierId){
				for(let i=0; i<this.panierId.length; i++ ){
					let dateLocal = this.panierId[i].date;
					this.panierId[i].date = new Date(dateLocal).toLocaleString();
				}

		}
	}
	
	
	paniereload(id){
				let u= this;
				u.tab = [];
				u.countPanier = 0;
	  		  		u.getpaniercounter(id).done((data)=> {

							u.countPanier = parseInt(data.body.length);
							
							if(data.body.length > 5){
								u.tab = [];
								for(let i =0; i<5; i++){
									u.tab.push(i);
								}
									u.rest = data.body.length - 5;
							}else{
								u.tab = [];
								for(let i =0; i<data.body.length; i++){
									u.tab.push(i);
								}
							}
							// console.log(data.body.length);
				}).fail(function(data) {
							
							u.countPanier = 0;
							
				}).always(function(data) {
					u.getPanierId(id);				
				});	
	}
	  
	getPanierAll(){
		
			let u = this;
			$.getJSON( u.urlglobal, ( data )=> {
 
					u.panierAll = data.body;
					
			});
		
		
		}
		
	getpaniercounter(id): any{
	
					let u = this;
					
					return	$.getJSON( u.urlAll + '/' + id, ( data )=> {});

	}	
		
		
		
	count(id){
		
			let u = this;
						this.countother(id);	
				return	$.getJSON( u.urlAll + '/' + id, ( data )=> {});
		
	}
	
	countother(id){
		
			let u = this;

				
				
			
				const interval = setInterval(()=>{
				
			let token = localStorage.getItem('togetToken');
			let tokenLog = localStorage.getItem('log');
			
			if(token && tokenLog){				
				
				
				
							
					$.getJSON( u.urlAll + '/' + id, ( data )=> {
					
					
					
					}).done((data)=> {
			
			
					if(data.status == 0){
						
						
									u.countPanier = data.body.length;
							
							
								
						}
												
					}).fail((data)=> {
					
							u.countPanier = 0;
							
					}).always((data)=> {
					
										
						if(data.status != 0 ){
							u.countPanier = 0;						
						}
										
					});
				}else{
			clearInterval(interval);
			u.countPanier = 0;
			}
					
				}, 60000);
			
			

		
	}

		getPanierId(id){
		
			let u = this;
			u.panierId = [];
			$.getJSON( u.urlAll + '/' + id, ( data )=> {
 
					u.panierId = data.body;
					u.calculprix();
					u.calculdate();
					
			});
			
		
		}

		getPanierIdReturn(id): any{
		
			let u = this;
			return $.getJSON( u.urlAll + '/' + id, ( data )=> {});
			
		
		}
		
		
		getingAll(id){
			
			this.count(id);
			this.getPanierId(id);
			
			}
		
	deleteByIdPanier(id){
		
		return new Promise((resolve, reject)=>{
				let u= this;
					$.ajax({
						
						url:u.urlglobal + '/' + id,
						contentType: "application/json; charset=utf-8",
						type:'delete',
						traditional: true,
						success: ()=>{
							resolve("ok");
							},
						error: ()=>{
							
							u.showerror("Une erreur est survenue. Veuillez verifier votre connexion internet et réessayer","Erreur!");
							
							}
						
						});
		});
		}
		
	deleteAllPanier(){
		let u= this;
		$.ajax({
			
			url:u.urlglobal,
            contentType: "application/json; charset=utf-8",
			type:'delete',
			traditional: true,
			success: ()=>{
				 u.showSuccess("Element supprimé avec succès","Suppression");
				},
			error: (error)=>{
				
				u.showerror("Une erreur est survenue. Veuillez verifier votre connexion internet et réessayer","Erreur!");
				
				}
			
			});
		
		
		}
		
	updatePanier(idBlock, idMembre, quantite, idTarif, id){
		let u= this;
					let data: any ={
					idBlock: idBlock,
					idMembre: idMembre,
					quantite: quantite,
					idTarif: idTarif,
					id: id
					};
		$.ajax({
			
			url:u.urlglobal,
			data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
			type:'put',
			traditional: true,
			success: (dataobject)=>{
			
				},
			error: (error)=>{
					u.showerror("Une erreur est survenue. Veuillez verifier votre connexion internet et réessayer","Erreur!");
				}
			
			});
		
		}
}
