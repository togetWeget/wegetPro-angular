import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {LayoutComponent} from './layout/layout.component';
import {ProfilAbonneComponent} from './abonnes/profil-abonne/profil-abonne.component';
import {ListAbonnesBlockComponent} from './abonnes/list-abonnes-block/list-abonnes-block.component';
import {ListeBlocComponent} from './liste-bloc/liste-bloc.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ContactAbonneComponent} from './abonnes/contact-abonne/contact-abonne.component';
import {AuthGuardSiteService} from '../core/services/AuthGuardSite/auth-guard-site.service';
import {AuthGuardTogetService} from '../core/services/AuthGuards/auth-guard-toget.service';
import {NotFoundComponent} from '../core/not-found/not-found.component';
import {FormulaireComponent} from './abonnements/formulaire/formulaire.component';
import {PrixComponent} from './abonnements/prix/prix.component';
import {PanierViewComponent} from './panier-view/panier-view.component';
import {CategorieEcoleComponent} from './ecole/categorie-ecole/categorie-ecole.component';
import {UrlGuardService} from '../core/services/url-guard.service';

const routes: Routes = [
  {
    path: '',  component: LayoutComponent, 
    canActivateChild: [AuthGuardSiteService], children: [
      {
        path: '',  component: AccueilComponent
      },
      {path: 'blocks', component: ListeBlocComponent},
      {path: 'blocks/:id', component: ListAbonnesBlockComponent},
      {path: 'espace/ecole/:id', component: CategorieEcoleComponent},
      {path: 'abonnes/profile/:id',component: ProfilAbonneComponent},
      {path: 'abonnes/conctater/:id', component: ContactAbonneComponent},     
      {path: 'abonnement/prix/:id', component: PrixComponent},
      {path: 'abonnement/form/:id', component: FormulaireComponent},
      {path: 'profile', component: ProfilAbonneComponent},
      {path: 'panier/:id', component: PanierViewComponent},
      {
        path: '**', component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
