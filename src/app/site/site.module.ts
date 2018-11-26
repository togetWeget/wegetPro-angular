import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterPipe} from './chat-cli/Filtermembre.pipe';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular-6-social-login";
import { PanierViewComponent } from './panier-view/panier-view.component';
import { AbonneComponent } from './abonnes/abonne/abonne.component';
import { BioProfilComponent } from './abonnes/profil/bio-profil/bio-profil.component';
import { FormationProfilComponent } from './abonnes/profil/formation-profil/formation-profil.component';
import { ExperienceProfilComponent } from './abonnes/profil/experience-profil/experience-profil.component';
import { DocumentsProfilComponent } from './abonnes/profil/documents-profil/documents-profil.component';
import { PhotosProfilComponent } from './abonnes/profil/photos-profil/photos-profil.component';
import { ChatCliComponent } from './chat-cli/chat-cli.component';
import { CategorieEcoleComponent } from './ecole/categorie-ecole/categorie-ecole.component';
import { ListeEcoleComponent } from './ecole/liste-ecole/liste-ecole.component';
import { PageEcoleComponent } from './ecole/page-ecole/page-ecole.component';
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { SingleEcoleComponent } from './ecole/single-ecole/single-ecole.component';
import { LayoutProfilComponent } from './abonnes/layout-profil/layout-profil.component';
import { AbonneSpecialComponent } from './abonnes/abonne-special/abonne-special.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { VerificationComponent } from './verification/verification.component';
import { PasswordUpdatedComponent } from './password-updated/password-updated.component';
import { DocEcoleComponent } from './ecole/doc-ecole/doc-ecole.component';
import { FormsEcoleComponent } from './ecole/forms-ecole/forms-ecole.component';
import { DetailEcoleComponent } from './ecole/detail-ecole/detail-ecole.component';
import { InfosEcoleComponent } from './ecole/infos-ecole/infos-ecole.component';
import { PubliciteComponent } from './publicite/publicite.component';
import { PubHautComponent } from './pub-haut/pub-haut.component';
import { ModalpubComponent } from './modalpub/modalpub.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { PubProfilComponent } from './pub-profil/pub-profil.component';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("869099103193529")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("7618043472-v75gqiqq6jku8g6pdeb5fhnau7fib1qt.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CustomMeterialModule,
    CoreModule,
    SiteRoutingModule,
	SocialLoginModule,
	FormsModule,
	FilterPipeModule,
  LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    ReactiveFormsModule
  ],
  providers: [{provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}],
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
    SingleBlockComponent,
    PanierViewComponent,
    AbonneComponent,
    BioProfilComponent,
    FormationProfilComponent,
    ExperienceProfilComponent,
    DocumentsProfilComponent,
    PhotosProfilComponent,
    CategorieEcoleComponent,
    ListeEcoleComponent,
    PageEcoleComponent,
    OwlCarouselComponent,
	SingleEcoleComponent,
	LayoutProfilComponent,
	AbonneSpecialComponent,
	VerificationComponent,
	PasswordUpdatedComponent,
	DocEcoleComponent,
	FormsEcoleComponent,
	DetailEcoleComponent,
	InfosEcoleComponent,
	PubliciteComponent,
	PubHautComponent,
	ModalpubComponent,
	PartenairesComponent,
	PubProfilComponent
  ],
  entryComponents: [
    InfosEcoleComponent
  ],
  exports: [LayoutComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SiteModule { }
