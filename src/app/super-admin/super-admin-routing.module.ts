import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {AbonnesComponent} from './abonnes/abonnes.component';
import {BlocksComponent} from './blocks/blocks.component';
import {BlockAddComponent} from './block-add/block-add.component';
import {BlockUpdateComponent} from './block-update/block-update.component';
import {BlockTarifsComponent} from './block-tarifs/block-tarifs.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: AccueilComponent
      },
      {
        path: 'abonnes', component: AbonnesComponent
      },
      {
        path: 'blocks', component: BlocksComponent
      },
      {
        path: 'blocks/add', component: BlockAddComponent
      },
      {
        path: 'blocks/update/:id', component: BlockUpdateComponent
      },
      {
        path: 'blocks/tarifs/:id', component: BlockTarifsComponent
      },
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
export class SuperAdminRoutingModule { }
