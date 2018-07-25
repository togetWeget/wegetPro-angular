import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appCustomStyle]'
})
export class CustomStyleDirective implements OnInit {

  @Input() csd_background: string;
  @Input() csd_color: string;
  @Input() csd_margin: string;
  @Input() csd_padding: string;

  constructor(private el: ElementRef) { }

  ngOnInit () {
    this.el.nativeElement.style.background = (this.csd_background !== undefined) ? this.csd_background : 'inherit';
    this.el.nativeElement.style.color = (this.csd_color !== undefined) ? this.csd_color : 'inherit';
    this.el.nativeElement.style.margin = (this.csd_margin !== undefined) ? this.csd_margin : 'inherit';
    this.el.nativeElement.style.padding = (this.csd_padding !== undefined) ? this.csd_padding : 'inherit';
  }

}
