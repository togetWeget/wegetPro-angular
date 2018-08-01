import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appBlocPage]'
})
export class BlocPageDirective implements OnInit {

  @Input() wpr_margin: string;
  @Input() wpr_padding: string;
  @Input() wpr_width: string;
  @Input() wpr_height: string;
  @Input() wpr_bg: string;
  @Input() wpr_bg_img: string;
  @Input() wpr_bg_attachment: string;
  @Input() wpr_float_both: boolean;

  constructor(private el: ElementRef) {
  }

  ngOnInit () {
    this.el.nativeElement.style.margin = (this.wpr_margin !== undefined) ? this.wpr_margin : 'inherit';
    this.el.nativeElement.style.padding = (this.wpr_padding !== undefined) ? this.wpr_padding : '30px 20px';
    this.el.nativeElement.style.background = (this.wpr_bg !== undefined) ? this.wpr_bg : 'inherit';
    this.el.nativeElement.style.backgroundImage = (this.wpr_bg_img !== undefined) ? this.wpr_bg_img : 'inherit';
    this.el.nativeElement.style.backgroundAttachment = (this.wpr_bg_attachment !== undefined) ? this.wpr_bg_attachment : 'inherit';
    this.el.nativeElement.style.width = (this.wpr_width !== undefined) ? this.wpr_width : '100%';
    this.el.nativeElement.style.height = (this.wpr_height !== undefined) ? this.wpr_height : 'inherit';
    this.el.nativeElement.style.display = (this.wpr_float_both === true) ? 'flex' : 'block';
    this.el.nativeElement.style.justifyContent = (this.wpr_float_both === true) ? 'space-between' : 'flex-start';
  }
}
