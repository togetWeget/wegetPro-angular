import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
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
import { ListeBlocComponent } from './liste-bloc/liste-bloc.component';
import { CarouselSiteComponent } from './carousel-site/carousel-site.component';
import {ContactAbonneComponent} from './abonnes/contact-abonne/contact-abonne.component';
import {SearchAbonnesComponent} from './abonnes/search-abonnes/search-abonnes.component';
import {ListBlocksComponent} from './list-blocks/list-blocks.component';
import {ListAbonnesBlockComponent} from './abonnes/list-abonnes-block/list-abonnes-block.component';
import {ListAbonnesComponent} from './abonnes/list-abonnes/list-abonnes.component';
import {ProfilAbonneComponent} from './abonnes/profil-abonne/profil-abonne.component';
import {FormulaireComponent} from './abonnements/formulaire/formulaire.component';
import {PrixComponent} from './abonnements/prix/prix.component';
import { SingleBlockComponent } from './single-block/single-block.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomMeterialModule,
    CoreModule,
    SiteRoutingModule
  ],
  providers: [],
  declarations: [
    AccueilComponent, 
    LayoutComponent, 
    FooterComponent, 
    ToolbarComponent,
    RegisterComponent, 
    LoginComponent, 
    ListeBlocComponent, 
    CarouselSiteComponent,
    ContactAbonneComponent,
    SearchAbonnesComponent,
    ListBlocksComponent,
    ListAbonnesBlockComponent,
    ListAbonnesComponent,
    ProfilAbonneComponent,
    FormulaireComponent,
    PrixComponent,
    SingleBlockComponent
  ],
  exports: [LayoutComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SiteModule { }
