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
    PagesModule
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
