import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { LayoutComponent } from './layout/layout.component';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {AdminRoutingModule} from '../admin/admin-routing.module';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule,
    SuperAdminRoutingModule
  ],
  declarations: [LayoutComponent, AccueilComponent, FooterComponent],
  exports: [LayoutComponent]
})
export class SuperAdminModule { }
