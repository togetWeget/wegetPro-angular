import {AfterContentInit, AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appBlocTitle]'
})
export class BlocTitleDirective implements OnInit, AfterViewInit, AfterContentInit {
  @Input() wpr_color: string;
  @Input() wpr_position: string;
  @Input() wpr_size: string;
  @Input() wpr_weight: string;
  @Input() wpr_padding: string;
  @Input() wpr_margin: string;
  @Input() wpr_upper: boolean;

  constructor(private el: ElementRef) { }

  ngOnInit () {
    this.init();
  }

  ngAfterContentInit () {
  }

  ngAfterViewInit () {
  }

  init () {
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.color = (this.wpr_color !== undefined) ? this.wpr_color : '#333333';
    this.el.nativeElement.style.fontSize = (this.wpr_size !== undefined) ? this.wpr_size : '3rem';
    this.el.nativeElement.style.fontWeight = (this.wpr_weight !== undefined) ? this.wpr_weight : '700';
    this.el.nativeElement.style.padding = (this.wpr_padding !== undefined) ? this.wpr_padding : '30px 0';
    this.el.nativeElement.style.margin = (this.wpr_margin !== undefined) ? this.wpr_margin : '10px';
    this.el.nativeElement.style.textTransform = (this.wpr_upper === true) ? 'uppercase' : 'inherit';
    switch (this.wpr_position) {
      case 'left':
        this.el.nativeElement.style.justifyContent = 'flex-start';
        break;
      case 'center':
        this.el.nativeElement.style.justifyContent = 'center';
        break;
      case 'right':
        this.el.nativeElement.style.justifyContent = 'flex-end';
        break;
    }
  }

}
