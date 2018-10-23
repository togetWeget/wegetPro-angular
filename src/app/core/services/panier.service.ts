import { Injectable } from '@angular/core';
import {catchError, map, observeOn, tap, timeout} from 'rxjs/operators';
import {Observable, of, Subject, interval, isObservable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';
import {OutilsService} from './outils.service';
import * as $ from 'jquery';

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
  constructor(public  http: HttpClient, private outils: OutilsService) {}
  
  
	setpanier(data){
		let u = this;
			console.log(data);
		$.ajax({
			
			url:u.urlglobal,
			data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
			type:'post',
			traditional: true,
			dataType:'json',
			success: function(query){
				console.log(query);
				},
			error: function(erreur){
				console.log(erreur.statusText + ', Veuillez verifier votre connexion internet et reessayer svp!');
				}
			
			});
	
	  
	  }
	  
	  
	getPanierAll(){
		
			let u = this;
			$.getJSON( u.urlglobal, function( data ) {
 
					u.panierAll = data.body;
					
			});
		
		
		}
		
		
		
		
		
	count(id){
		
			let u = this;
						this.countother(id);	
				return	$.getJSON( u.urlAll + '/' + id, function( data ) {});
		
	}
	
	countother(id){
		
			let u = this;

				
				
			
				const interval = setInterval(()=>{
				
			let token = localStorage.getItem('togetToken');
			let tokenLog = localStorage.getItem('log');
			
			if(token && tokenLog){				
				
				
				
							
					$.getJSON( u.urlAll + '/' + id, function( data ) {
					
					
					
					}).done(function(data) {
			
			
					if(data.status == 0){
						
						
									u.countPanier = data.body.length;
							
							
								
						}
												
					}).fail(function(data) {
					
							u.countPanier = 0;
							
					}).always(function(data) {
					
										
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
			$.getJSON( u.urlAll + '/' + id, function( data ) {
 
					u.panierId = data.body;
					console.log(u.panierId);
					
			});
			
		
		}
		
		
		getingAll(id){
			
			this.count(id);
			this.getPanierId(id);
			
			}
		
	deleteByIdPanier(id){
	let u= this;
		$.ajax({
			
			url:u.urlglobal + '/' + id,
            contentType: "application/json; charset=utf-8",
			type:'delete',
			traditional: true,
			success: function(){
				
				},
			error: function(){
				
				
				
				}
			
			});
		
		}
		
	deleteAllPanier(){
		let u= this;
		$.ajax({
			
			url:u.urlglobal,
            contentType: "application/json; charset=utf-8",
			type:'delete',
			traditional: true,
			success: function(){
				
				},
			error: function(){
				
				
				
				}
			
			});
		
		
		}
		
	updatePanier(data){
		let u= this;
		
		$.ajax({
			
			url:u.urlglobal,
			data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
			type:'put',
			traditional: true,
			success: function(dataobject){
				console.log(dataobject);
				},
			error: function(error){
				console.log(error);
				}
			
			});
		
		}
}
