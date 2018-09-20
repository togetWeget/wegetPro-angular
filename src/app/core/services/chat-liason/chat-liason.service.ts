import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatLiasonService {
	public chatactivate : boolean;
	public chatinfo : any = {};
  constructor() {}
  
	getboolean(){
	  this.chatactivate = false
	}
	  
	
}
