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
import { CustomMeterialModule } from '../custom-meterial/custom-meterial.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule
  ],
  providers: [],
  declarations: [AccueilComponent, LayoutComponent, FooterComponent, ToolbarComponent, RegisterComponent, LoginComponent],
  exports: [LayoutComponent]
})
export class SiteModule { }
