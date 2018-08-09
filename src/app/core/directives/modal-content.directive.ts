import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appModalContent]'
})
export class ModalContentDirective implements OnInit {

  @Input() m_background: string;
  @Input() m_width: string;
  @Input() m_height: string;
  @Input() m_radius: string;
  @Input() m_padding: string;
  constructor(private el: ElementRef) { }
  ngOnInit () {
    this.el.nativeElement.style.display = 'table';
    this.el.nativeElement.style.background = (this.m_background !== undefined) ? this.m_background : '#ffffff';
    this.el.nativeElement.style.maxWidth = (this.m_width !== undefined) ? this.m_width : '600px';
    this.el.nativeElement.style.height = (this.m_height !== undefined) ? this.m_height : 'auto';
    this.el.nativeElement.style.borderRadius = (this.m_radius !== undefined) ? this.m_radius : '5px';
    this.el.nativeElement.style.padding = (this.m_padding !== undefined) ? this.m_padding : '30px';
    this.el.nativeElement.style.boxShadow = '1px 1px 15px #000';
    this.el.nativeElement.style.position = 'relative';
  }
}

