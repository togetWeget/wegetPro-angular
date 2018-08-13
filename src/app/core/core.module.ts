import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from './services/message.service';
import {AbonnesService} from './services/abonnes/abonnes.service';
import {BlockService} from './services/blocks/block.service';
import {HttpClientModule} from '@angular/common/http';
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
import { ChatComponent } from './chat/chat.component';
import { NotFoundComponent } from './not-found/not-found.component'; 
import { NgHttpLoaderModule } from 'ng-http-loader';
import { TopZoneComponent } from './comp/top-zone/top-zone.component';
import { WidgetInfoComponent } from './comp/widget-info/widget-info.component';
import { AdminTableComponent } from './comp/admin-table/admin-table.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminCardComponent } from './comp/admin-card/admin-card.component';
import { AdminBlockComponent } from './comp/admin-block/admin-block.component';
import { ApercuBlockComponent } from './comp/apercu-block/apercu-block.component';
import { AdminTarifsComponent } from './comp/admin-tarifs/admin-tarifs.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgHttpLoaderModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMeterialModule,
    NotifierModule,
    CustomDirectivesModule,
    NgxPaginationModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  declarations: [
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
    ChatComponent,
    NotFoundComponent,
    TopZoneComponent, 
    WidgetInfoComponent, AdminTableComponent, AdminCardComponent,
     AdminBlockComponent, ApercuBlockComponent, AdminTarifsComponent
  ],
  exports: [
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
    ChatComponent,
    NotFoundComponent,
    TopZoneComponent, 
    WidgetInfoComponent, 
    AdminTableComponent,
    NgxPaginationModule,
    AdminCardComponent,
    AdminBlockComponent,
    ApercuBlockComponent,
    AdminTarifsComponent
  ],
  entryComponents: [
    ApercuBlockComponent
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
