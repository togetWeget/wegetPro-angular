import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {AccueilComponent} from './accueil/accueil.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
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
import { EspaceComponent } from './paiement/espace/espace.component';
import { BlockComponent } from './paiement/block/block.component';
import { DetailBlockComponent } from './paiement/detail-block/detail-block.component';
import { DesabonneComponent } from './paiement/desabonne/desabonne.component';
import { ReabonneComponent } from './paiement/reabonne/reabonne.component';
import { HistoriqueComponent } from './paiement/historique/historique.component';
import { PaiementComponent } from './paiement/paiement/paiement.component';
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
 
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule
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
   AdminTarifsComponent, EspaceComponent, 
   BlockComponent, DetailBlockComponent, 
   DesabonneComponent, ReabonneComponent, HistoriqueComponent, 
   PaiementComponent, CoverProfilComponent, 
   ListeMessageComponent, MessageComponent, ViewMessageComponent, 
   SupprimeMessageComponent, RepondreMessageComponent, LayoutMessageComponent,
    ListeMessageEnvoyeComponent, LayoutCompteComponent, 
  ],
  exports: [LayoutComponent]
})
export class AdminModule {
}
