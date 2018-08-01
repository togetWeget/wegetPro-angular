import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {LayoutComponent} from './layout/layout.component';
import {ProfilAbonneComponent} from '../core/abonnes/profil-abonne/profil-abonne.component';
import {ListAbonnesBlockComponent} from '../core/abonnes/list-abonnes-block/list-abonnes-block.component';
import {ListBlocksComponent} from '../core/blocks/list-blocks/list-blocks.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ContactAbonneComponent} from '../core/abonnes/contact-abonne/contact-abonne.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: AccueilComponent
      },
      {path: 'blocks', component: ListBlocksComponent},
      {path: 'blocks/:id', component: ListAbonnesBlockComponent},
      {path: 'abonnes/profile/:id', component: ProfilAbonneComponent},
      {path: 'abonnes/conctater/:id', component: ContactAbonneComponent},
      {path: 'profile', component: ProfilAbonneComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
