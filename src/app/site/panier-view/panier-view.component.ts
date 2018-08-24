import { Component, OnInit } from '@angular/core';
import {PanierService} from '../../core/services/panier.service';
import {isObject} from 'rxjs/internal/util/isObject';
import * as $ from 'jquery';

@Component({
  selector: 'app-panier-view',
  templateUrl: './panier-view.component.html',
  styleUrls: ['./panier-view.component.scss']
})
export class PanierViewComponent implements OnInit {
public qtite: any = 0;
public prix = 0;
public datejr = new Date();
public getAllPanier: any = {};
public verif: boolean;
public verif2: boolean;
public countPanier = 0;
  constructor(public panier: PanierService) {
	  this.verif = true;
	  this.getpanier(101);
	  this.runningcheck();
	 
	  }

  ngOnInit() {
	  this.panier.count(101);
	  alert(this.panier.countPanier);
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
						u.verif = false;
						u.verif2 = true;
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
    u.verif = false;
  if(u.getAllPanier.length>=0){
	   u.countPanier = u.getAllPanier.length;
	   }else{
	    u.countPanier = 0;
	   }
  })
  .fail(function() {
    u.verif = false;
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
	
}
