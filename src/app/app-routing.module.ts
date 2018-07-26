import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccueilComponent} from './site/accueil/accueil.component';
import {AuthGuardTogetService} from './core/services/AuthGuards/auth-guard-toget.service';

const routes: Routes = [
  {
    path: '', redirectTo: '/site', pathMatch: 'full'
  },
  {
    path: 'site', loadChildren: './site/site.module#SiteModule'
  },
  {
    path: 'admin', canActivate: [AuthGuardTogetService], loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'super/admin', loadChildren: './super-admin/super-admin.module#SuperAdminModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
