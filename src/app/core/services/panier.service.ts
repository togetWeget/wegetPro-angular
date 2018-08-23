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
public urlset = 'http://wegetback:8080/panier';
  constructor(public  http: HttpClient) { }
  
  
	setpanier(data){
		let u = this;
			console.log(data);
		$.ajax({
			
			url:u.urlset,
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
	  
	  
	getPanierAll(url){
		
			let u = this;
			$.getJSON( url, function( data ) {
 
					u.panierAll = data.body;
					
			});
		
		
		}
		
		
	getPanierId(url){
		
			let u = this;
			$.getJSON( url, function( data ) {
 
					u.panierId = data.body;
					
			});
		
		}
		
	deleteByIdPanier(url, data){
		$.ajax({
			
			url:url,
			data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
			type:'post',
			traditional: true,
			success: function(){
				
				},
			error: function(){
				
				
				
				}
			
			});
		
		}
		
	deleteAllPanier(url, data){
		
		$.ajax({
			
			url:url,
			data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
			type:'post',
			traditional: true,
			success: function(){
				
				},
			error: function(){
				
				
				
				}
			
			});
		
		
		}
		
	updatePanier(url, data){
		
		
		$.ajax({
			
			url:url,
			data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
			type:'post',
			traditional: true,
			success: function(){
				
				},
			error: function(){
				
				
				
				}
			
			});
		
		}
}
