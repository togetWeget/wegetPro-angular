import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSuperModalDir]'
})
export class SuperModalDirDirective {

  constructor(public vcRef: ViewContainerRef) { }

}
