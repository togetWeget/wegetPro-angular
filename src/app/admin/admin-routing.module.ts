import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {AuthGuardTogetService} from '../core/services/AuthGuards/auth-guard-toget.service';
import {Chatroom2Component} from './chatroom2/chatroom2.component';
import {NotFoundComponent} from '../core/not-found/not-found.component';
import { ListEspaceComponent } from './paiement/list-espace/list-espace.component';
import { FormuleComponent } from './paiement/formules/formule.component';
import { ReabonneComponent } from './paiement/reabonne/reabonne.component';
import { ListeMessageComponent } from './messagerie/liste-message/liste-message.component';
import { MessageComponent } from './messagerie/message/message.component';
import { ViewMessageComponent } from './messagerie/view-message/view-message.component';
import { SupprimeMessageComponent } from './messagerie/supprime-message/supprime-message.component';
import { RepondreMessageComponent } from './messagerie/repondre-message/repondre-message.component';
import { LayoutMessageComponent } from './messagerie/layout-message/layout-message.component';
import { EspaceAnnonceComponent } from './espace/espace-annonce/espace-annonce.component';
import { EspaceCompetenceComponent } from './espace/espace-competence/espace-competence.component';
import { EspaceEcoleComponent } from './espace/espace-ecole/espace-ecole.component';
import { EspaceImmobilierComponent } from './espace/espace-immobilier/espace-immobilier.component';
import { ListeMessageEnvoyeComponent } from 
'./messagerie/liste-message-envoye/liste-message-envoye.component';
import { LayoutCompteComponent } from './compte/layout-compte/layout-compte.component';
import { DetailsCompteComponent } from './compte/details-compte/details-compte.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    canActivateChild: [AuthGuardTogetService],
    children: [
      {path: '', component: AccueilComponent},
      {
        path: 'compte', component: LayoutCompteComponent },
      {
        path: 'espace/annonce/:id', component: EspaceAnnonceComponent},
      {
        path: 'espace/competence/:id', component: EspaceCompetenceComponent},
      {path: 'espace/ecole/:id', component: EspaceEcoleComponent},
      {path: 'espace/ecole/:id', component: EspaceEcoleComponent},
      {
        path: 'espace/immobiler/:id', component: EspaceImmobilierComponent},
      {
        path: 'paiement/espace', component: ListEspaceComponent},
      {
        path: 'paiement/prix/:id', component: FormuleComponent},
      {
        path: 'reabonnement/prix/:id', component: ReabonneComponent},
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
