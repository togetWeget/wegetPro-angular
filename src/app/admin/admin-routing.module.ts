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
import { ListContactComponent} from './messagerie/list-contact/list-contact.component';
import { LayoutAnnonceComponent } from './espace-annonce/layout-annonce/layout-annonce.component';
import { LayoutCompetenceComponent } from './espace-competence/layout-competence/layout-competence.component';
import { LayoutEcoleComponent } from './espace-ecole/layout-ecole/layout-ecole.component';
import { LayoutImmobilierComponent } from './espace-immobilier/layout-immobilier/layout-immobilier.component';
import { ListeMessageEnvoyeComponent } from './messagerie/liste-message-envoye/liste-message-envoye.component';
import { LayoutCompteComponent } from './compte/layout-compte/layout-compte.component';
import { DetailsCompteComponent } from './compte/details-compte/details-compte.component';
import { GalleryComponent } from './compte/gallery/gallery.component';
import { PhotosComponent } from './compte/gallery/photos/photos.component';
import { VideoComponent } from './compte/gallery/video/video.component';
import { AllGalleryComponent } from './compte/gallery/all-gallery/all-gallery.component';
import { FormationEcoleViewComponent } from './espace-ecole/formation-ecole-view/formation-ecole-view.component';
import { EspaceGuardService } from '../core/services/guard/espace-guard.service';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    canActivateChild: [AuthGuardTogetService],
    children: [
      {path: '', component: AccueilComponent},
      {
        path: 'compte', component: LayoutCompteComponent },
      {
        path: 'espace/annonce/:id', component: LayoutAnnonceComponent},
      {
        path: 'espace/competence/:id', component: LayoutCompetenceComponent},
      {
        path: 'espace/ecole/:id', component: LayoutEcoleComponent},
      {
        path: 'espace/immobilier/:id', component: LayoutImmobilierComponent},
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
          { path: 'liste_contacts', component: ListContactComponent}, 
           {path:'liste_message_envoye', component: ListeMessageEnvoyeComponent}, 
           {path:'message', component: MessageComponent}, 
           {path:'read/:id', component: ViewMessageComponent}, 
           {path:'supprime_message', component: SupprimeMessageComponent}, 
           {path:'repondre_message/:id', component: RepondreMessageComponent}, 
           {path: '**', component: NotFoundComponent}, 
        ]
      },
      // {path: 'chatroom2', component: Chatroom2Component},
      {
		path: 'gallery', component: GalleryComponent,
			children: [
			{
				path: '', redirectTo: 'photo', pathMatch: 'full'
			},
			{
				path: 'photo', component: PhotosComponent
			},
			{
			path: 'video', component: VideoComponent
			},
			{
			path: 'allgallery', component: AllGalleryComponent
			},
			{
				path: '**', component: NotFoundComponent
			}, 
			]
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
export class AdminRoutingModule { }
