import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from './services/message.service';
import {AbonnesService} from './services/abonnes/abonnes.service';
import {BlockService} from './services/blocks/block.service';
import {ListBlocksComponent} from './blocks/list-blocks/list-blocks.component';
import {HttpClientModule} from '@angular/common/http';
import {ListAbonnesBlockComponent} from './abonnes/list-abonnes-block/list-abonnes-block.component';
import {ListAbonnesComponent} from './abonnes/list-abonnes/list-abonnes.component';
import {ProfilAbonneComponent} from './abonnes/profil-abonne/profil-abonne.component';
import {RouterModule} from '@angular/router';
import { BlocTitleDirective } from './directives/bloc-title.directive';
import { BlocPageDirective } from './directives/bloc-page.directive';
import { AdminTopZoneComponent } from './admin-top-zone/admin-top-zone.component';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import { AdminWidgetOneComponent } from './admin-widget-one/admin-widget-one.component';
import { CustomStyleDirective } from './directives/custom-style.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IfMediaQueryDirective } from './directives/if-media-query.directive';
import {RegisterComponent} from './clients/register/register.component';
import {LoginComponent} from './clients/login/login.component';
import {RegisterService} from './services/personne/membre/register.service';
import {NotifierModule} from 'angular-notifier';
import { ModalContentDirective } from './directives/modal-content.directive';
import { ModalBackdropDirective } from './directives/modal-backdrop.directive';
import { ModalTriggerDirective } from './directives/modal-trigger.directive';
import { ModalCloseDirective } from './directives/modal-close.directive';
import { PanelContainerDirective } from './directives/panel-container.directive';
import { PanelContentDirective } from './directives/panel-content.directive';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';
import {ContactAbonneComponent} from './abonnes/contact-abonne/contact-abonne.component';
import {SearchAbonnesComponent} from './abonnes/search-abonnes/search-abonnes.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMeterialModule,
    NotifierModule,
    CustomDirectivesModule
  ],
  declarations: [
    ListBlocksComponent,
    ListAbonnesBlockComponent,
    ListAbonnesComponent,
    ProfilAbonneComponent,
    BlocTitleDirective,
    BlocPageDirective,
    AdminTopZoneComponent,
    AdminWidgetOneComponent,
    CustomStyleDirective,
    IfMediaQueryDirective,
    LoginComponent,
    RegisterComponent,
    ModalContentDirective,
    ModalBackdropDirective,
    ModalTriggerDirective,
    ModalCloseDirective,
    PanelContainerDirective,
    PanelContentDirective,
    ContactAbonneComponent,
    SearchAbonnesComponent
  ],
  exports: [
    ListBlocksComponent,
    ListAbonnesBlockComponent,
    ListAbonnesComponent,
    ProfilAbonneComponent,
    BlocTitleDirective,
    BlocPageDirective,
    AdminTopZoneComponent,
    AdminWidgetOneComponent,
    CustomStyleDirective,
    IfMediaQueryDirective,
    LoginComponent,
    RegisterComponent,
    ModalContentDirective,
    ModalBackdropDirective,
    ModalTriggerDirective,
    ModalCloseDirective,
    PanelContainerDirective,
    PanelContentDirective,
    ContactAbonneComponent,
    SearchAbonnesComponent
  ],
  providers: [
    MessageService,
    AbonnesService,
    BlockService,
    RegisterService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule { }
