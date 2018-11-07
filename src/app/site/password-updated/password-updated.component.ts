import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-password-updated',
  templateUrl: './password-updated.component.html',
  styleUrls: ['./password-updated.component.scss']
})
export class PasswordUpdatedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
	showpwd(param,param2){
			let element = $("#"+param);
			let element2 = $("#"+param2);
		if(element2.hasClass('fa-eye')){
			element.attr("type","text");
			element2.removeClass("fa-eye").addClass("fa-eye-slash");	
		}else{
			element.attr("type","password");
			element2.removeClass("fa-eye-slash").addClass("fa-eye");				
		}
		
	}
}
