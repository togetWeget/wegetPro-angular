import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBlocksComponent} from './blocks/list-blocks/list-blocks.component';
import {ListAbonnesBlockComponent} from './abonnes/list-abonnes-block/list-abonnes-block.component';
import {ProfilAbonneComponent} from './abonnes/profil-abonne/profil-abonne.component';

const routes: Routes = [
  {path: '', redirectTo: '/blocks', pathMatch: 'full'},
  {path: 'blocks', component: ListBlocksComponent},
  {path: 'blocks/:block', component: ListAbonnesBlockComponent},
  {path: 'profile', component: ProfilAbonneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
