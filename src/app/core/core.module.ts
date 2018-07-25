import { NgModule } from '@angular/core';
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
import {BlocksTarifComponent} from './blocks/blocks-tarif/blocks-tarif.component';
import {BlocksAfficheComponent} from './blocks/blocks-affiche/blocks-affiche.component';
import {BlockPhotoComponent} from './blocks/block-photo/block-photo.component';
import {BlockManageComponent} from './blocks/block-manage/block-manage.component';
import {BlockListeComponent} from './blocks/block-liste/block-liste.component';
import {BlockEditerComponent} from './blocks/block-editer/block-editer.component';
import {BlockDetailComponent} from './blocks/block-detail/block-detail.component';
import {BlockDebutComponent} from './blocks/block-debut/block-debut.component';
import {BlockComponent} from './blocks/block/block.component';
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

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMeterialModule,
    NotifierModule
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
    BlocksTarifComponent,
    BlocksAfficheComponent,
    BlockPhotoComponent,
    BlockManageComponent,
    BlockListeComponent,
    BlockEditerComponent,
    BlockDetailComponent,
    BlockDebutComponent,
    BlockComponent,
    IfMediaQueryDirective,
    LoginComponent,
    RegisterComponent,
    ModalContentDirective,
    ModalBackdropDirective,
    ModalTriggerDirective,
    ModalCloseDirective,
    PanelContainerDirective,
    PanelContentDirective
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
    BlocksTarifComponent,
    BlocksAfficheComponent,
    BlockPhotoComponent,
    BlockManageComponent,
    BlockListeComponent,
    BlockEditerComponent,
    BlockDetailComponent,
    BlockDebutComponent,
    BlockComponent,
    IfMediaQueryDirective,
    LoginComponent,
    RegisterComponent,
    ModalContentDirective,
    ModalBackdropDirective,
    ModalTriggerDirective,
    ModalCloseDirective,
    PanelContainerDirective,
    PanelContentDirective
  ],
  providers: [
    MessageService,
    AbonnesService,
    BlockService,
    RegisterService
  ]
})
export class CoreModule { }
