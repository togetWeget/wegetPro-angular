import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-modalpub',
  templateUrl: './modalpub.component.html',
  styleUrls: ['./modalpub.component.scss']
})
export class ModalpubComponent implements OnInit {
	public pubPBool: boolean;
	public interval: any;
	public timo: any;
	public interval3: any;
	public timo3: any;
	public imglink = 1;
  constructor() { this.pubPBool = false; 
  this.pubprincipal(3000);
  this.showpub2();
  this.timerin();
  }

  ngOnInit() {
  }

  pubprincipal(param){
	  
	  let stor = this.getsession();
	  if(!stor){
		  let timout = setTimeout(()=>{
				this.pubPBool = true;
				this.setsession();
		  }, param); 
	  }
	  
  }
  
  setsession(){
	  let dateP = new Date();
	  dateP.setDate(dateP.getDate() + 1);
	  let date = dateP.getTime();
	  sessionStorage.setItem('pubPrincal', JSON.stringify({data: '1', timer: date }));
  }
  
  getsession(): boolean{
	let data = JSON.parse(sessionStorage.getItem('pubPrincal'));
	let Today = new Date().getTime();
	if(data){
		if(Today > data.timer && data.data == '1') {
			return false;
		}else{
			return true;
		}
	}else{
		return false;
	}
  }
  
  delsession(){
	  sessionStorage.removeItem('pubPrincal');
  }
  
  closing(){
	  this.pubPBool = false;
  }
  
  closepub2(){
	  $(".pub2").animate({left: '-250px'});
  }
  
  showpub2(){
	  // this.affichEl(); 
	  this.interval = setInterval(()=>{
		 this.affichEl(); 
		 this.timo = setTimeout(()=>{
				this.closepub2();
				setTimeout(()=>{
					this.imglink++;
				},1000);
		}, 8500);  
		if(this.imglink == 4){
			this.imglink = 1;
		}  
		  
	  },10000);
	  
  }
	  
  affichEl(){
		 $(".pub2").show();
		 $(".pub2").animate({left: '0px'}); 
  } 
  
 closeingpub2(){
	this.closepub2();
	$(".pub2").fadeOut(); 
	setTimeout(()=>{
		clearInterval(this.interval);
		clearTimeout(this.timo);	
	},5000);
	 
 }
 
 hover(){
	clearInterval(this.interval);
	clearTimeout(this.timo); 
 }
	
	getrandom(max): any{
		return Math.floor(Math.random() * Math.floor(max));
	}
	
  pub3(){
	$(".pub3").show();
	$(".pub3").animate({bottom: '0px'});     
  }
  
  hidepub3(){
	$(".pub3").animate({bottom: '-250px'}); 	  
		setTimeout(()=>{
			$(".pub3").hide();
		},2000);  
  }
  
  timerin(){
	setTimeout(()=>{
		this.pub3();
			// this.timo3 = setTimeout(()=>{
						// this.hidepub3();
				// },5000);  
	},60000);  
  }
  
  closingpub3(){
	  clearTimeout(this.timo3);
  }
  
  restart(){
	  			this.timo3 = setTimeout(()=>{
						this.hidepub3();
				},5000);  
  }
}
