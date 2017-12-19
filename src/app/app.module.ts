import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertService } from './service/alert.service';
import { RequestService } from './service/request.service';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './guards/index';

import { LoginComponent } from './pages/login/login.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AlertComponent } from './directives/index';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';

import { ArticleModal } from './pages/dashboard/components/articleModal';
import { UserModal } from './pages/dashboard/components/userModal';

// Application wide providers
const APP_PROVIDERS = [
  RequestService,
  AuthGuard,
  AlertService
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AlertComponent,
    ArticleModal,
    UserModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [APP_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
