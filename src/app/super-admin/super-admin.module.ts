import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule
  ],
  declarations: [AccueilComponent, LayoutComponent],
  exports: [AccueilComponent, LayoutComponent]
})
export class SuperAdminModule { }
