import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatExpansionModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ListBlocksComponent } from './blocks/list-blocks/list-blocks.component';
import { ListAbonnesBlockComponent } from './abonnes/list-abonnes-block/list-abonnes-block.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ListAbonnesComponent } from './abonnes/list-abonnes/list-abonnes.component';
import { ProfilAbonneComponent } from './abonnes/profil-abonne/profil-abonne.component';

@NgModule({
  declarations: [
    AppComponent,
    ListBlocksComponent,
    ListAbonnesBlockComponent,
    ToolbarComponent,
    ListAbonnesComponent,
    ProfilAbonneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
