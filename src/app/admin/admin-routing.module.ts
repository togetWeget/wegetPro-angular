import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {AuthGuardTogetService} from '../core/services/AuthGuards/auth-guard-toget.service';
import {Chatroom2Component} from './chatroom2/chatroom2.component';
import {NotFoundComponent} from '../core/not-found/not-found.component';
import { EspaceComponent } from './paiement/espace/espace.component';
import { ListeMessageComponent } from './messagerie/liste-message/liste-message.component';
import { MessageComponent } from './messagerie/message/message.component';
import { ViewMessageComponent } from './messagerie/view-message/view-message.component';
import { SupprimeMessageComponent } from './messagerie/supprime-message/supprime-message.component';
import { RepondreMessageComponent } from './messagerie/repondre-message/repondre-message.component';
import { LayoutMessageComponent } from './messagerie/layout-message/layout-message.component';
import { ListeMessageEnvoyeComponent } from 
'./messagerie/liste-message-envoye/liste-message-envoye.component';
import { LayoutCompteComponent } from './compte/layout-compte/layout-compte.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    canActivateChild: [AuthGuardTogetService],
    children: [
      {path: '', component: AccueilComponent},
      {
        path: 'compte', component: LayoutCompteComponent, children: [
        {path: '', component: LayoutComponent}
        ]
      },
      {path: 'paiement/espace', component: EspaceComponent},
      {
        path: 'messagerie', component: LayoutMessageComponent, 
        children: [
           {path:'', redirectTo: 'liste_message', pathMatch: 'full'}, 
           {path:'liste_message', component: ListeMessageComponent}, 
           {path:'liste_message_envoye', component: ListeMessageEnvoyeComponent}, 
           {path:'message', component: MessageComponent}, 
           {path:'view_message', component: ViewMessageComponent}, 
           {path:'supprime_message', component: SupprimeMessageComponent}, 
           {path:'repondre_message', component: RepondreMessageComponent}, 
           {path: '**', component: NotFoundComponent}, 
        ]
      },
      {path: 'chatroom2', component: Chatroom2Component},
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
export class AdminRoutingModule { }
