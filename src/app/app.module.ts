import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {SiteModule} from './site/site.module';
import { AdminModule } from './admin/admin.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiteModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SuperAdminModule,
    AdminModule,
    NoopAnimationsModule,
    CoreModule,
    HttpClientModule,
    NgHttpLoaderModule,
    RouterModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
