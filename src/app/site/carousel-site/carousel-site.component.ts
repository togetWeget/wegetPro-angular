import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { AbonnesService } from '../../core/services/abonnes/abonnes.service';
import { Abonnes } from '../../shared/models/abonnes';
import { Detailblock } from '../../shared/models/detailblock';
import * as $ from 'jquery';


@Component({
  selector: 'app-carousel-site',
  templateUrl: './carousel-site.component.html',
  styleUrls: ['./carousel-site.component.scss']
})
export class CarouselSiteComponent implements OnInit {
  
  abonneFlash: any=[];
  nombreLigne: number[]=[];
  public ligneCarousel: any= [];
	public lterminate: any = [];
  constructor(private abonnesService: AbonnesService) { }
		carouselLoad(param){
			if(this.abonneFlash){
					let taille = this.abonneFlash.length;
					let tt =param;
					let ligneTab = Math.round(taille/tt);
					let xx = 0;
					for (let i = 0; i < ligneTab; i++) {
						let	j= i*tt;
						for (let k=j ; k < j+tt; k++) {
							if(k < taille){
							this.lterminate.push(this.abonneFlash[k]);	
							}else{
								if(i == ligneTab - 1){
									if(j+tt > taille){
										let f = (j+tt) - taille;
										let w = taille - f;
										if(k > w){
											this.lterminate.push(this.abonneFlash[xx]);	
												xx++;
										}	
									}		
								}
							}	
						}
							this.ligneCarousel[i] = this.lterminate;
							this.lterminate = [];
							this.lterminate.length = 0;
							this.lterminate.splice(0, this.lterminate.length) ;
					}
				}else{}
		}
		
		
  ngOnInit() {
  	this.fetchAbonneFlash();
  
  }
  fetchAbonneFlash(){
  	this.abonnesService.getAllAbonnes()
      .subscribe(data => {
        this.abonneFlash = data.body;
        this.carouselLoad(6);
      });
  }
 
}