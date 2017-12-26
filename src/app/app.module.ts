import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RequestService } from './service/request.service';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './guards/index';

import { LoginComponent } from './pages/login/login.component';
import { NoContentComponent } from './pages/no-content';
import { PagesModule } from './pages/pages.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
// Application wide providers
const APP_PROVIDERS = [
  RequestService,
  AuthGuard
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
