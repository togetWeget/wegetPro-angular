import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, 
  MatToolbarModule} from '@angular/material';
import {FooterComponent} from './footer/footer.component';
import {CoreModule} from '../core/core.module';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import {RouterModule} from '@angular/router';
import {Chatroom2Component} from './chatroom2/chatroom2.component';
import {FilterPipe} from './chatroom2/Filtermembre.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { TopZoneComponent } from './comp/top-zone/top-zone.component';
import { WidgetInfoComponent } from './comp/widget-info/widget-info.component';
import { AdminTableComponent } from './comp/admin-table/admin-table.component';
import { AdminCardComponent } from './comp/admin-card/admin-card.component';
import { AdminBlockComponent } from './comp/admin-block/admin-block.component';
import { ApercuBlockComponent } from './comp/apercu-block/apercu-block.component';
import { AdminTarifsComponent } from './comp/admin-tarifs/admin-tarifs.component';
import { ListEspaceComponent } from './paiement/list-espace/list-espace.component';
import { BlockComponent } from './paiement/block/block.component';
import { FormuleComponent } from './paiement/formules/formule.component';
import { DesabonneComponent } from './paiement/desabonne/desabonne.component';
import { ReabonneComponent } from './paiement/reabonne/reabonne.component';
import { HistoriqueComponent } from './paiement/historique/historique.component';
import { CoverProfilComponent } from './comp/cover-profil/cover-profil.component';
import { ListeMessageComponent } from './messagerie/liste-message/liste-message.component';
import { MessageComponent } from './messagerie/message/message.component';
import { ViewMessageComponent } from './messagerie/view-message/view-message.component';
import { SupprimeMessageComponent } from './messagerie/supprime-message/supprime-message.component';
import { RepondreMessageComponent } from './messagerie/repondre-message/repondre-message.component';
import { LayoutMessageComponent } from './messagerie/layout-message/layout-message.component';
import { ListeMessageEnvoyeComponent } from 
'./messagerie/liste-message-envoye/liste-message-envoye.component';
import { LayoutCompteComponent } from './compte/layout-compte/layout-compte.component';
import { EspaceComponent } from './paiement/espace/espace.component';
import { DetailsCompteComponent } from './compte/details-compte/details-compte.component';
import { FormationCompteComponent } from './compte/formation-compte/formation-compte.component';
import { ExperienceCompteComponent } from './compte/experience-compte/experience-compte.component';
import { AuthCompteComponent } from './compte/auth-compte/auth-compte.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EspaceEcoleComponent } from './espace/espace-ecole/espace-ecole.component';
import { EspaceCompetenceComponent } from './espace/espace-competence/espace-competence.component';
import { EspaceImmobilierComponent } from './espace/espace-immobilier/espace-immobilier.component';
import { EspaceAnnonceComponent } from './espace/espace-annonce/espace-annonce.component';
import { CoverSelectComponent } from './compte/cover-select/cover-select.component';
 
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    NgSelectModule  
  ],
  declarations: [
   LayoutComponent,
   AccueilComponent, 
   FooterComponent,
   Chatroom2Component,
   FilterPipe,
   TopZoneComponent, 
   WidgetInfoComponent, 
   AdminTableComponent, 
   AdminCardComponent,
   AdminBlockComponent, 
   ApercuBlockComponent, 
   AdminTarifsComponent, ListEspaceComponent, 
   BlockComponent, FormuleComponent, 
   DesabonneComponent, ReabonneComponent, HistoriqueComponent, 
   CoverProfilComponent,ListeMessageComponent, MessageComponent, ViewMessageComponent, 
   SupprimeMessageComponent, RepondreMessageComponent, LayoutMessageComponent,
    ListeMessageEnvoyeComponent, LayoutCompteComponent, EspaceComponent, 
    DetailsCompteComponent, FormationCompteComponent, ExperienceCompteComponent, 
    AuthCompteComponent, EspaceEcoleComponent, EspaceCompetenceComponent, 
    EspaceImmobilierComponent, EspaceAnnonceComponent, CoverSelectComponent, 
  ],
  entryComponents: [BlockComponent,CoverSelectComponent],
  exports: [LayoutComponent]
})
export class AdminModule {
}
