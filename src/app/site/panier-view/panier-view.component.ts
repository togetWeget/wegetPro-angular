import { Component, OnInit } from '@angular/core';
import {PanierService} from '../../core/services/panier.service';
import {InfoMembreService} from '../../core/services/info-membre/info-membre.service';
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
public verif: boolean;
public verif2: boolean;
public countPanier = 0;
public stor = localStorage.getItem('togetToken');
public storlog = localStorage.getItem('log');
public dataLocal;
public truem:boolean;
public gData: any;
public idMod: number;
  constructor(public panier: PanierService, private router: Router, public infoM: InfoMembreService) {
  this.countPanier = 0;
	  this.verif = true;
	  if(this.storlog && this.stor){
		  this.infoM.getbylogin();
		}
		this.truem = false;
	  }

  ngOnInit() {
	  this.truem = false;
  	  if(this.storlog && this.stor){
		  this.infoM.getbylogin();
		}
	  this.panier.panierId = [];
	  // this.getInfopanier();
	  // this.putupdate();
	 // let inf = setInterval(()=>{
		  // if(this.panier.panierId){
			 // this.verif = false; 
			// clearInterval(inf);
		  // }else{
			  this.getInfopanier();
		  // }  
	  // },3000);
  }


  convertDate(date){

	 this.dataLocal =  new Date(date).toLocaleString();
	  }

  getInfopanier(){
			let u = this;
			u.countPanier = 0;
		if(this.storlog && this.stor){

			// const lhtInterval = setInterval(()=>{

			this.panier.count(this.infoM.InfoMembres.id).done(function(data) {

						// console.log(u.infoM.InfoMembres.id);
					if(data.status == 0){

								if(u.infoM.InfoMembres.id){
									u.getpanier();
									u.countPanier = data.body.length;
									u.panier.countPanier = u.countPanier;
									// alert(u.countPanier);
									u.verif = false;
									// clearInterval(lhtInterval);
									// console.log('closed');
								}

						}

					}).fail(function(data) {

							u.countPanier = 0;

					}).always(function(data) {

						if(data.status != 0 ){

							u.verif = false;
							u.countPanier = 0;
							// clearInterval(lhtInterval);
							// console.log('closed 2');

						}
						u.panier.countPanier = 	u.countPanier;
					});





			// }, 3000);

		}else{
			this.verif = false;
		}
	}


	up(param){
		this.panier.panierId[param].quantite = parseInt(this.panier.panierId[param].quantite) + 1;
		this.panier.panierId[param].montant = parseInt(this.panier.panierId[param].quantite) * parseInt(this.panier.panierId[param].tarif.prix);
		this.calculprix();
		this.panier.updatePanier(this.panier.panierId[param].block.id, this.infoM.InfoMembres.id, this.panier.panierId[param].quantite , this.panier.panierId[param].tarif.id, this.panier.panierId[param].id);
	}


	down(param){
		if(parseInt(this.panier.panierId[param].quantite) > 1){
	this.panier.panierId[param].quantite = parseInt(this.panier.panierId[param].quantite) - 1;
	this.panier.panierId[param].montant = parseInt(this.panier.panierId[param].quantite) * parseInt(this.panier.panierId[param].tarif.prix);
	this.calculprix();
	this.panier.updatePanier(this.panier.panierId[param].block.id, this.infoM.InfoMembres.id, this.panier.panierId[param].quantite , this.panier.panierId[param].tarif.id, this.panier.panierId[param].id);
		}
	// let q = $('#'+param).val();

		// if(q > 1){
			// q = parseInt(q) - 1;
			// $('#'+param).val(q);
		// }
	}


	calculdate(){
		
		if(this.panier.panierId){
				for(let i=0; i<this.panier.panierId.length; i++ ){
					let dateLocal = this.panier.panierId[i].date;
					this.panier.panierId[i].date = new Date(dateLocal).toLocaleString();
				}

			}
		}
		
		calculprix(){
		
		if(this.panier.panierId){
				this.prix = 0; this.panier.Total = 0;
				for(let i=0; i<this.panier.panierId.length; i++ ){
					this.prix += parseInt(this.panier.panierId[i].montant);
					this.panier.Total = this.prix;
				}

			}else{
				
				this.panier.Total = 0;
				
			}

		}


	runningcheck(){

		const interv = setInterval( ()=>{
			// alert(1);
			if(this.panier.countPanier != this.countPanier){

				this.getpanier();

			}

		},1000);

		}


	getpanier(){
			let u = this;
			u.panier.panierId = [];
		this.panier.getPanierIdReturn(this.infoM.InfoMembres.id)
						.done((data)=> {
								u.panier.panierId = data.body;
								// u.panier.panierId = data.body;
								// console.log(u.panier.panierId);
									if(data.body){
									u.calculprix();
									u.calculdate();
										}
									  if(u.panier.panierId.length>=0){
									   u.countPanier = u.panier.panierId.length;
									   }else{
										u.countPanier = 0;
									   }
						})
						.fail(function() {
								u.verif2 = false;
						})
						.always(function() {

							u.verif = false;
							if(u.panier.panierId.length>=0){
							u.countPanier = u.panier.panierId.length;
							}else{
								u.countPanier = 0;
							}

						});
						



		}

		othercheck(){
			this.router.navigate(['/site/blocks']);

			}

	putupdate(){
		// let data: any ={
					// idBlock: 38,
				  // idMembre: 121,
				   // quantite: 30,
				  // idTarif: 40,
				  // id: 130
		// };
		// this.panier.updatePanier(data);
		}
	testSenpanier(){
		// this.panier.updatePanier(10, this.infoM.InfoMembres.id, 5, 753, 5);
		
		
	}
	
	deletepanier(id){
		this.panier.deleteByIdPanier(id).then((result)=>{
			if(result == "ok"){
				this.getInfopanier();
				this.panier.showSuccess("Element supprimé avec succès","Suppression");
			}else{
				// this.getInfopanier();
				this.panier.showerror("Une erreur est survenue. Veuillez verifier votre connexion internet et réessayer","Erreur!");
			}
		});		
	}
	
	truemodal(data: any, id){
		this.truem = true;
		this.gData = data;
		this.idMod = id;
	}
}
