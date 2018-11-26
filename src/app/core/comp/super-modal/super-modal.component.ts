import { Component, OnInit, Input, ViewChild, ElementRef,
OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-super-modal',
  templateUrl: './super-modal.component.html',
  styleUrls: ['./super-modal.component.scss']
})
export class SuperModalComponent implements OnInit, OnChanges {
  @ViewChild('modals') modals: any;
  @Input('state') state: boolean;
  @Input('superClass') superClass: string;

  constructor() {

  }

  ngOnInit() {
  	this.updateModal();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
  	this.updateModal();
  }

  updateModal(){
  	this.modals.nativeElement.style.display = (this.state)? 'flex' : 'none';
  }

  closeModal(){
  	this.modals.nativeElement.style.display = 'none';
  }
}
