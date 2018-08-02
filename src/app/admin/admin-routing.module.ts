import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {AuthGuardTogetService} from '../core/services/AuthGuards/auth-guard-toget.service';
import {ListBlocksComponent} from '../core/blocks/list-blocks/list-blocks.component';
import {Chatroom2Component} from './chatroom2/chatroom2.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: AccueilComponent},
      {path: 'chatroom2', component: Chatroom2Component, canActivate: [AuthGuardTogetService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
