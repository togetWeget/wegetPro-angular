import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './site/accueil/accueil.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {AuthGuardTogetService} from './core/services/AuthGuards/auth-guard-toget.service';
import {AuthGuardSiteService} from './core/services/AuthGuardSite/auth-guard-site.service';
import {VerificationComponent} from './site/verification/verification.component';
import {PasswordUpdatedComponent} from './site/password-updated/password-updated.component';
import {RegisterComponent} from './site/register/register.component';
import {LoginComponent} from './site/login/login.component';
const routes: Routes = [
  {
    path: '', redirectTo: '/site', pathMatch: 'full'
  },
  {
    path: 'site', canActivate: [AuthGuardSiteService], loadChildren: './site/site.module#SiteModule'
  },
  {
    path: 'super/admin', loadChildren: './super-admin/super-admin.module#SuperAdminModule'
  },
  {
    path: 'admin', canActivate: [AuthGuardTogetService], loadChildren: './admin/admin.module#AdminModule'
  },
  {
	  path: 'control', component: VerificationComponent
  },   
  {
	  path: 'checking', component: PasswordUpdatedComponent
  },
  {
	   path: 'register', component: RegisterComponent
  },
  {
	  
	  path: 'login', component: LoginComponent
  
  },  
  {
    path: '**', canActivate: [AuthGuardTogetService], component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
