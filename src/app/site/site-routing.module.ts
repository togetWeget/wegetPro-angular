import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {LayoutComponent} from './layout/layout.component';
import {ProfilAbonneComponent} from '../core/abonnes/profil-abonne/profil-abonne.component';
import {ListAbonnesBlockComponent} from '../core/abonnes/list-abonnes-block/list-abonnes-block.component';
import {ListBlocksComponent} from '../core/blocks/list-blocks/list-blocks.component';
import {BlockComponent} from '../core/blocks/block/block.component';
import {BlockManageComponent} from '../core/blocks/block-manage/block-manage.component';
import {BlockListeComponent} from '../core/blocks/block-liste/block-liste.component';
import {BlockDebutComponent} from '../core/blocks/block-debut/block-debut.component';
import {BlockEditerComponent} from '../core/blocks/block-editer/block-editer.component';
import {BlockPhotoComponent} from '../core/blocks/block-photo/block-photo.component';
import {BlockDetailComponent} from '../core/blocks/block-detail/block-detail.component';
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
  },
  {
    path: 'block', component: BlockComponent,
    children: [

      {
        path: '', component: BlockManageComponent
      },
      {
        path: 'liste',
        component: BlockListeComponent,
        children: [
          {path: '', component: BlockDebutComponent},
          {
            path: 'creer', component: BlockEditerComponent
          },
          {path: 'creerPhoto', component: BlockPhotoComponent},

          {
            path: ':id', component: BlockDetailComponent
          },
          {
            path: ':id/edite', component: BlockEditerComponent
          },
          {path: ':id/photo', component: BlockPhotoComponent},

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
