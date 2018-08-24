import { Injectable } from '@angular/core';
import {catchError, map, observeOn, tap, timeout} from 'rxjs/operators';
import {Observable, of, Subject, interval, isObservable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {NotifierService} from 'angular-notifier';
import {isObject} from 'rxjs/internal/util/isObject';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
public panierAll: any = {};
public panierId: any = {};
public urlglobal = 'http://wegetback:8080/panier';
public urlAll = 'http://wegetback:8080/panierParPersonne';
public countPanier = 0;
  constructor(public  http: HttpClient) { }
  
  
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
			
			const interval = setInterval(()=>{
				
									$.getJSON( u.urlAll + '/' + id, function( data ) {
 
					u.panierId = data.body;
					u.countPanier =u.panierId.length;
					// u.runningcheck();
					
					
					
						}).done(function() {
							u.countPanier =u.panierId.length;
						  })
						  .fail(function() {
							u.countPanier = 0;
						  })
						  .always(function() {
						   
							u.countPanier = u.panierId.length;
						  });
			  
			  
				
				},1000);
		
	}

		getPanierId(id){
		
			let u = this;
			$.getJSON( u.urlAll + '/' + id, function( data ) {
 
					u.panierId = data.body;
					console.log(u.panierId);
					
			});
			
		
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
			success: function(){
				
				},
			error: function(){
				
				
				
				}
			
			});
		
		}
}
