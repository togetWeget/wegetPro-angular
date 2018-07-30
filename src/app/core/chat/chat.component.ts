import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('msgBoxToggle', [
      state('invisible', style({
        right: '-600px'
      })),
      state('visible',   style({
        right: '30px'
      })),
      transition('invisible => visible', animate('500ms ease-in')),
      transition('visible => invisible', animate('500ms ease-out'))
    ]),
    trigger('msgBoxSwhitch', [
      state('pan1', style({
        marginLeft: '0px'
      })),
      state('pan2',   style({
        marginLeft: '-300px'
      })),
      state('pan3',   style({
        marginLeft: '-600px'
      })),
      transition('* => *', animate('500ms ease-in'))
    ]),
  ]
})
export class ChatComponent implements OnInit {
  msgToggle: string;
  msgSwicher: string;

  constructor() {
    this.msgToggle = 'invisible';
    this.msgSwicher = 'pan1';
  }

  ngOnInit() {
  }

  toggleMsgBox () {
    this.msgToggle = (this.msgToggle === 'visible') ? 'invisible' : 'visible';
  }

  switchPan1 () {
    this.msgSwicher = 'pan1';
  }
  switchPan2 () {
    this.msgSwicher = 'pan2';
  }
  switchPan3 () {
    this.msgSwicher = 'pan3';
  }

}
