import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { LayoutComponent } from './layout/layout.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBar,
  MatToolbarModule
} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import {CoreModule} from '../core/core.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    CoreModule,
    MatButtonModule,
    RouterModule
  ],
  providers: [],
  declarations: [AccueilComponent, LayoutComponent, FooterComponent, ToolbarComponent],
  exports: [LayoutComponent]
})
export class SiteModule { }
