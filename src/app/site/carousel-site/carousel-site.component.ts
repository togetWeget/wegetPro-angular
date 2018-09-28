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
  
  abonneFlash: Detailblock[]=[];
  constructor(private abonnesService: AbonnesService, private router: Router) { }

  ngOnInit() {
  	//this.fetchAbonneFlash();
  	$(document).ready(() => {
	  	$(".js-carousel").each(function(){
		var $carousel = $(this),
			$carouselContainer = $carousel.find(".js-carousel-container"),
			$carouselList = $carousel.find(".js-carousel-list"),
			$carouselItem = $carousel.find(".js-carousel-item"),
			$carouselButton = $carousel.find(".js-carousel-button"),
			setItemWidth = function(){
				$carouselList.removeAttr("style");
				var curWidth = $($carouselItem[0]).outerWidth() * $carouselItem.length;
				$carouselList.css("width", curWidth);
			},
			slide = function(){
				var $button = $(this),
					dir = $button.data("dir"),
					curPos = parseInt($carouselList.css("left")) || 0,
					moveto = 0,
					containerWidth = $carouselContainer.outerWidth(),
					listWidth = $carouselList.outerWidth(),
					before = (curPos + containerWidth),
					after = listWidth + (curPos - containerWidth);
				if(dir=="next"){
					moveto = (after < containerWidth) ? curPos - after : curPos - containerWidth;
				} else {
					moveto = (before >= 0) ? 0 : curPos + containerWidth;
				}
				
				
				$carouselList.animate({
					left: moveto
				});
			};
		$(window).resize(function(){
			setItemWidth();
		});
		setItemWidth();
		
		$carouselButton.on("click", slide);
	});
  	});
  }
  fetchAbonneFlash(){
  	this.abonnesService.getAllAbonnes()
      .subscribe(data => {
      	// const detailblock: Detailblock[] = data.body;
       //  this.abonneFlash = detailblock;
        // this.abonneFlash = data.body;
      });
  }
  onViewProfileAbonne(ab: any) {
	this.router.navigate(['/site/abonnes', 'profile', ab.id]);
  }
}