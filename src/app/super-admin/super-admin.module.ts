
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { LayoutComponent } from './layout/layout.component';
import {CustomMeterialModule} from '../custom-meterial/custom-meterial.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {CoreModule} from '../core/core.module';
import {FooterComponent} from './footer/footer.component';
import { AbonnesComponent } from './abonnes/abonnes.component';
import { BlocksComponent } from './blocks/blocks.component';
import { BlockUpdateComponent } from './block-update/block-update.component';
import { BlockAddComponent } from './block-add/block-add.component';
import { BlockTarifsComponent } from './block-tarifs/block-tarifs.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { BlockTarifsAddComponent } from './block-tarifs-add/block-tarifs-add.component';
import { TopZoneComponent } from './comp/top-zone/top-zone.component';
import { WidgetInfoComponent } from './comp/widget-info/widget-info.component';
import { AdminTableComponent } from './comp/admin-table/admin-table.component';
import { AdminCardComponent } from './comp/admin-card/admin-card.component';
import { AdminBlockComponent } from './comp/admin-block/admin-block.component';
import { ApercuBlockComponent } from './comp/apercu-block/apercu-block.component';
import { AdminTarifsComponent } from './comp/admin-tarifs/admin-tarifs.component';
import { BlockPhotoComponent } from './block-photo/block-photo.component';
import { AbonnesAddComponent } from './abonnes-add/abonnes-add.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    CoreModule,
    RouterModule,
    CustomMeterialModule,
    SuperAdminRoutingModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    DragAndDropModule.forRoot()
  ],
  declarations: [
   LayoutComponent, 
   AccueilComponent, 
   FooterComponent, 
   AbonnesComponent, 
   BlocksComponent, 
   BlockUpdateComponent, 
   BlockAddComponent,
   BlockTarifsComponent,
   BlockTarifsAddComponent,
   TopZoneComponent, 
   WidgetInfoComponent, 
   AdminTableComponent, 
   AdminCardComponent,
   AdminBlockComponent, 
   ApercuBlockComponent, 
   AdminTarifsComponent, 
   BlockPhotoComponent, AbonnesAddComponent
  ],
  entryComponents: [
    ApercuBlockComponent,
    BlockTarifsAddComponent,
    BlockPhotoComponent
  ],
  exports: [LayoutComponent]
})
export class SuperAdminModule { }
