import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocPageDirective } from './bloc-page.directive';
import { TitleDirective } from './title.directive';
import { CardDirective } from './card.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BlocPageDirective, TitleDirective, CardDirective],
  exports: [BlocPageDirective, TitleDirective, CardDirective]
})
export class CustomDirectivesModule { }
