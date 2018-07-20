import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { LayoutComponent } from './layout/layout.component';
import {MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatSnackBar, MatToolbarModule} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import {CoreModule} from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CoreModule
  ],
  providers: [],
  declarations: [AccueilComponent, LayoutComponent, FooterComponent],
  exports: [AccueilComponent, LayoutComponent]
})
export class SiteModule { }
