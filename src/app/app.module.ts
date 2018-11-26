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
// import { NgHttpLoaderModule } from 'ng-http-loader';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ToastrModule } from 'ngx-toastr';
import {NgxMaskModule} from 'ngx-mask';
import { FilterPipeModule} from 'ngx-filter-pipe';
import { OwlModule } from 'ngx-owl-carousel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {FilterPipe} from './site/chat-cli/Filtermembre.pipe';
import { ChatCliComponent } from './site/chat-cli/chat-cli.component';
// import { ModalpubComponent } from './site/modalpub/modalpub.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBar,
  MatToolbarModule,
  MatFormFieldModule,
  MatRippleModule,
  MatInputModule
} from '@angular/material';


// import { QuillModule } from 'ngx-quill';
// import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  declarations: [
    AppComponent,
	ChatCliComponent,
	// ModalpubComponent,
	FilterPipe
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiteModule,
    FilterPipeModule,
	FormsModule,
	MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    // QuillModule,
    // TinymceModule.withConfig({}),
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SuperAdminModule,
    AdminModule,
    NoopAnimationsModule,
    CoreModule,
    HttpClientModule,
    // NgHttpLoaderModule,
    RouterModule,
    SharedModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    OwlModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
  // LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
