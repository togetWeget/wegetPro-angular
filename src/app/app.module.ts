import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {SiteModule} from './site/site.module';
import { AdminModule } from './admin/admin.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import {NoopAnimationsModule, BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './core/clients/login/login.component';
import { SharedModule } from './shared/shared.module';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ToastrModule } from 'ngx-toastr';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent
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
    SharedModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule
  ],
  entryComponents: [
  // LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
