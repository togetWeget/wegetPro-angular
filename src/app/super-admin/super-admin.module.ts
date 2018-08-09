import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { LayoutComponent } from './layout/layout.component';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {FooterComponent} from './footer/footer.component';
import { AbonnesComponent } from './abonnes/abonnes.component';
import { BlocksComponent } from './blocks/blocks.component';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule,
    SuperAdminRoutingModule
  ],
  declarations: [LayoutComponent, AccueilComponent, FooterComponent, AbonnesComponent, BlocksComponent],
  exports: [LayoutComponent]
})
export class SuperAdminModule { }
