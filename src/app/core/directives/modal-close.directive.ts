import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appModalClose]'
})
export class ModalCloseDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit () {
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.right = '0';
    this.el.nativeElement.style.background = '#e32617';
    this.el.nativeElement.style.top = '0';
    this.el.nativeElement.style.padding = '15px';
    this.el.nativeElement.style.color = '#ffffff';
    this.el.nativeElement.style.borderRadius = '5px';
    this.el.nativeElement.style.cursor = 'pointer';
  }

}
