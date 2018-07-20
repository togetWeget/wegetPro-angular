import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {LayoutComponent} from './layout/layout.component';
import {ProfilAbonneComponent} from '../core/abonnes/profil-abonne/profil-abonne.component';
import {ListAbonnesBlockComponent} from '../core/abonnes/list-abonnes-block/list-abonnes-block.component';
import {ListBlocksComponent} from '../core/blocks/list-blocks/list-blocks.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: AccueilComponent
      },
      {path: 'blocks', component: ListBlocksComponent},
      {path: 'blocks/:block', component: ListAbonnesBlockComponent},
      {path: 'profile', component: ProfilAbonneComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
