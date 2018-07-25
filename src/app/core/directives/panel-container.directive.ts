import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appPanelContainer]'
})
export class PanelContainerDirective implements OnInit {

  @Input() pc_width: string;
  @Input() pc_height: string;
  @Input() pc_bg_color: string;
  @Input() pc_bg_img: string;
  @Input() pc_position: string;
  constructor(private el: ElementRef) { }

  ngOnInit () {
    this.el.nativeElement.style.width = (this.pc_width !== undefined) ? this.pc_width : '100%';
    this.el.nativeElement.style.position = 'relative';
    this.el.nativeElement.style.display = 'flex';
    switch (this.pc_position) {
      case 'left':
        this.el.nativeElement.style.justifyContent = 'flex-start';
        break;
      case 'center':
        this.el.nativeElement.style.justifyContent = 'center';
        this.el.nativeElement.style.alignItems = 'center';
        break;
      case 'right':
        this.el.nativeElement.style.justifyContent = 'flex-end';
        break;
    }
  }
}
