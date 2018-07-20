import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessageService} from './services/message.service';
import {AbonnesService} from './services/abonnes/abonnes.service';
import {BlockService} from './services/blocks/block.service';
import {ListBlocksComponent} from './blocks/list-blocks/list-blocks.component';
import {MatCardModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ListAbonnesBlockComponent} from './abonnes/list-abonnes-block/list-abonnes-block.component';
import {ListAbonnesComponent} from './abonnes/list-abonnes/list-abonnes.component';
import {ProfilAbonneComponent} from './abonnes/profil-abonne/profil-abonne.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [ListBlocksComponent, ListAbonnesBlockComponent, ListAbonnesComponent, ProfilAbonneComponent],
  exports: [ListBlocksComponent, ListAbonnesBlockComponent, ListAbonnesComponent, ProfilAbonneComponent],
  providers: [MessageService, AbonnesService, BlockService]
})
export class CoreModule { }
