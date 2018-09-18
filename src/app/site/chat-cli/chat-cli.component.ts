import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-chat-cli',
  templateUrl: './chat-cli.component.html',
  styleUrls: ['./chat-cli.component.scss']
})
export class ChatCliComponent implements OnInit {
	public chatactive : boolean;
  constructor() { }

  ngOnInit() {
  }
	ifactivechat(){
		if(this.chatactive == true){
			$("#qnimate").addClass("popup-box-on");
			}else{
			$("#qnimate").removeClass("popup-box-on");
			}
	}
	
	activatechat(){
		this.chatactive = true;	
		this.ifactivechat();
	}
	
	desactivatechat(){
		this.chatactive = false;
		this.ifactivechat();
	}
	
}
