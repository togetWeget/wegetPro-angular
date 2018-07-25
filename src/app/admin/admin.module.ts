import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { AccueilComponent } from './accueil/accueil.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import {CoreModule} from '../core/core.module';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule
  ],
  declarations: [LayoutComponent, AccueilComponent, FooterComponent],
  exports: [LayoutComponent]
})
export class AdminModule { }
