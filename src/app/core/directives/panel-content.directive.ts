import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appPanelContent]'
})
export class PanelContentDirective implements OnInit {

  @Input() pc_background: string;
  @Input() pc_width: string;
  @Input() pc_height: string;
  @Input() pc_radius: string;
  @Input() pc_padding: string;
  constructor(private el: ElementRef) { }
  ngOnInit () {
    this.el.nativeElement.style.display = 'table';
    this.el.nativeElement.style.background = (this.pc_background !== undefined) ? this.pc_background : '#ffffff';
    this.el.nativeElement.style.width = (this.pc_width !== undefined) ? this.pc_width : '600px';
    this.el.nativeElement.style.height = (this.pc_height !== undefined) ? this.pc_height : 'auto';
    this.el.nativeElement.style.borderRadius = (this.pc_radius !== undefined) ? this.pc_radius : '5px';
    this.el.nativeElement.style.padding = (this.pc_padding !== undefined) ? this.pc_padding : '30px';
    this.el.nativeElement.style.boxShadow = '1px 1px 15px #000';
    this.el.nativeElement.style.position = 'relative';
  }
}
