import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

@Directive({
  selector: '[appModalBackdrop]'
})
export class ModalBackdropDirective implements OnInit, OnChanges {

  @Input() m_toggle: number;
  @Input() m_initial: boolean = null;
  m_visible: boolean = null;
  @Input() appModalBackdrop: string;
  constructor(private el: ElementRef) { }

  ngOnInit () {
    this.el.nativeElement.style.position = 'fixed';
    this.el.nativeElement.style.boxSizing = 'border-box';
    this.el.nativeElement.style.zIndex = '3000';
    this.el.nativeElement.style.background = 'rgba(0,0,0,0.2)';
    this.el.nativeElement.style.width = '100%';
    this.el.nativeElement.style.height = '100%';
    this.el.nativeElement.style.top = '0';
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.justifyContent = 'center';
    this.el.nativeElement.style.alignItems = 'center';
    this.el.nativeElement.style.visibility = (this.m_initial === true) ? 'visible' : 'hidden';
    this.m_visible = (this.m_initial === true) ? true : false;
  }

  ngOnChanges (changes: {[propKey: string]: SimpleChange}) {
    this.toogle();
  }

  toogle () {
    this.el.nativeElement.style.visibility = (this.m_visible === true) ? 'hidden' : 'visible';
    this.m_visible = (this.m_visible === true) ? false : true;
  }

}
