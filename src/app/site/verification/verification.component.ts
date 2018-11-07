import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute,ParamMap,Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
	public dcmp: any = 0;
	public bool: boolean;
  constructor(public router: Router) { }

  ngOnInit() {
	  let chk = $(".eq input");
	  chk[0].focus();
  }
	decompt(paramin, paramout){
		this.dcmp = paramin;
		
		let intervalset = setInterval(()=>{
			
			this.dcmp = this.dcmp - 1;
		},1000);
		
		let timoutset = setTimeout(()=>{
			clearInterval(intervalset);
			this.redirecting();
			
		},paramout);
	}
	redirecting(){
		// $("#admin").click();
		this.router.navigate(['/admin', { externalUrl: '/admin' }]);
	}
	
	checktrue(param, events: KeyboardEvent){
		let last = 0;
			let chk = $("input");
				let i = param;
				let taille = chk.eq( i ).val().length;
			if(events.which == 8){
				if(i > 0){
				chk.eq( i - 1 ).focus();
				}
			}else{	
				if(taille > 0){
					i++;
					if(i <= 6){
						
					chk.eq( i ).prop("disabled", false);
					chk.eq( i ).focus();
					
					}else{
						return false;
					}
				}
				if(param == 5){
					for(let h = 0; h< 6; h++){
						let d = chk.eq( h ).val().length;
						if(d > 0){
								last++;
						}									
					}
					if(last == 6){
						$(".inputv").fadeOut(1000);
						  this.bool = false;
					}
				}
			}
		
		
	}
	
	booltrue(){	
		this.bool = true;	
		this.decompt(10,11000);
	}

}
