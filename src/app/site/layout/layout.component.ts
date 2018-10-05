import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChatCliComponent} from '../chat-cli/chat-cli.component';
import {ChatLiasonService} from '../../core/services/chat-liason/chat-liason.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements  OnDestroy {
  mobileQuery: MediaQueryList;
  @ViewChild('chat') public chat: ChatCliComponent;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
	public changechat: boolean;
  private _mobileQueryListener: () => void;
	public msgbool = false;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public chatl: ChatLiasonService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
	// this.changechat = false;
	this.chatl.chatactivate = false;
	// console.log(this.chatl.globalCompt);
	// this.chat.getallStat();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  loadchat(){
  this.chatl.globalCompt = 0;
  // this.changechat = true;
  this.chatl.chatactivate = true;
  if(this.chatl.chatactivate == true){
	  this.chat.activatechat();
	  }
  }

  closechat(){
  this.chatl.globalCompt = 0;
  // this.changechat = false;
  this.chatl.chatactivate = false;
  if(this.chatl.chatactivate == false){
	  this.chat.desactivatechat();
	  }
  }

}
