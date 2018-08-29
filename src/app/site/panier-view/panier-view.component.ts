import { Component, OnInit } from '@angular/core';
import {PanierService} from '../../core/services/panier.service';
import {InfoMembreService} from '../../core/services/Info-membre/info-membre.service';
import {isObject} from 'rxjs/internal/util/isObject';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier-view',
  templateUrl: './panier-view.component.html',
  styleUrls: ['./panier-view.component.scss']
})
export class PanierViewComponent implements OnInit {
public qtite: any = 0;
public prix = 0;
public datejr = new Date();
public getAllPanier: any[] = [];
public verif: boolean;
public verif2: boolean;
public countPanier = 0;
public stor = localStorage.getItem('togetToken');
public storlog = localStorage.getItem('log');
public dataLocal;
  constructor(public panier: PanierService, private router: Router, public infoM: InfoMembreService) {
  this.countPanier = 0;
	  this.verif = true;
	  if(this.storlog && this.stor){
		  this.infoM.getbylogin();
		}
	 
	 
	  }

  ngOnInit() {
  	  if(this.storlog && this.stor){
		  this.infoM.getbylogin();
		}
	  this.getInfopanier();
	  // this.putupdate();
  }
  
  
  convertDate(date){
	  
	 this.dataLocal =  new Date(date).toLocaleString();
	  }
  
  getInfopanier(){
			let u = this;
			u.countPanier = 0;
		if(this.storlog && this.stor){
		
			const lhtInterval = setInterval(()=>{
			
			this.panier.count(this.infoM.InfoMembres.id).done(function(data) {
			
						console.log(u.infoM.InfoMembres.id);
					if(data.status == 0){
						
								if(u.infoM.InfoMembres.id){
									u.getpanier(u.infoM.InfoMembres.id);
									u.countPanier = data.body.length;
									u.panier.countPanier = u.countPanier;
									// alert(u.countPanier);
									u.verif = false;
									clearInterval(lhtInterval);
									console.log('closed');
								}
								
						}
												
					}).fail(function(data) {
					
							u.countPanier = 0;
							
					}).always(function(data) {
					
						if(data.status != 0 ){
					
							u.verif = false;
							u.countPanier = 0;
							clearInterval(lhtInterval);
							console.log('closed 2');
							
						}
						u.panier.countPanier = 	u.countPanier;			
					});
					

			

			
			}, 1000);

		}else{
			this.verif = false;
		}
	}
		
		
	up(param){
		this.getAllPanier[param].quantite = parseInt(this.getAllPanier[param].quantite) + 1;
		this.getAllPanier[param].total = parseInt(this.getAllPanier[param].quantite) * parseInt(this.getAllPanier[param].tarif.prix);
		this.calculprix();
	}
		
		
	down(param){
		if(parseInt(this.getAllPanier[param].quantite) > 1){
	this.getAllPanier[param].quantite = parseInt(this.getAllPanier[param].quantite) - 1;
	this.getAllPanier[param].total = parseInt(this.getAllPanier[param].quantite) * parseInt(this.getAllPanier[param].tarif.prix);
	this.calculprix();
		}
	// let q = $('#'+param).val();
	
		// if(q > 1){
			// q = parseInt(q) - 1;
			// $('#'+param).val(q);
		// }
	}

	
	calculprix(){
		if(this.getAllPanier){
		this.prix = 0;
			for(let i=0; i<this.getAllPanier.length; i++ ){
					this.prix += parseInt(this.getAllPanier[i].total);
					let dateLocal = this.getAllPanier[i].date;
					this.getAllPanier[i].date = new Date(dateLocal).toLocaleString();
				}
			
			}
		
		}
		
		
	runningcheck(){
	
		const interv = setInterval( ()=>{
			// alert(1);
			if(this.panier.countPanier != this.countPanier){
			
				this.getpanier(101);
				
			}
			
		},1000);
		
		}
		
		
	getpanier(id){
	
			let u = this;
			$.getJSON( u.panier.urlAll + '/' + id, function( data ) {
 
					u.getAllPanier = data.body;
					console.log(u.getAllPanier);
						if(data.body){		
						u.calculprix();
							}
						  if(u.getAllPanier.length>=0){
						   u.countPanier = u.getAllPanier.length;
						   }else{
							u.countPanier = 0;
						   }
					// u.runningcheck();
					
					
					
			}).done(function() {
				if(u.getAllPanier.length>=0){
				u.countPanier = u.getAllPanier.length;
				}else{
				u.countPanier = 0;
				}
			})
			.fail(function() {
					u.verif2 = false;
			})
			.always(function() {
  
						u.verif = false;
						if(u.getAllPanier.length>=0){
						u.countPanier = u.getAllPanier.length;
						}else{
							u.countPanier = 0;
						}
    
			});
		
		
		}
		
		othercheck(){
			this.router.navigate(['/site/blocks']);
			
			}
			
	putupdate(){
		let data: any ={
					idBlock: 38,
				  idMembre: 121,
				   quantite: 30,
				  idTarif: 40,
				  id: 130
		};
		this.panier.updatePanier(data);
		}
	
}
