import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appIfMediaQuery]'
})
export class IfMediaQueryDirective implements OnInit, AfterViewInit {

  hasView: boolean = null;
  mql: MediaQueryList;
  @Input() appIfMediaQuery: string;
  constructor(private elementRef: ElementRef) { }

  ngOnInit () {
    if (!this.mql) {
      this.mql = window.matchMedia(this.appIfMediaQuery);
    }
    this.hasView = true;
    this.onMediaListener();
    // this.mql.addListener(this.onMediaListener);
  }

  ngAfterViewInit () {
  }

  @HostListener('window:resize')
  private onMediaListener () {
    if (this.mql.matches) {
      this.elementRef.nativeElement.style.visibility = '';
      this.elementRef.nativeElement.style.position = '';
      this.elementRef.nativeElement.style.zIndex = '';
      this.hasView = true;
    } else {
      this.elementRef.nativeElement.style.visibility = 'hidden';
      this.elementRef.nativeElement.style.position = 'absolute';
      this.elementRef.nativeElement.style.zIndex = '-1';
      this.hasView = false;
    }
  }
}
