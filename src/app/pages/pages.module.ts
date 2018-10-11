import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { AlertComponent } from '../directives/index';

import { PagesComponent } from './pages.component';
import { AlertService, RequestService } from 'app/service/index';
import { BsDropdownModule, ModalModule, ProgressbarModule } from 'ngx-bootstrap';
import { ArticleModal } from './dashboard/components/articleModal';
import { FiremsgComponent } from './common/firemsg';
import { UserModal } from './dashboard/components/userModal';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { DummyComponent } from './dummy/dummy.component';
@NgModule({
  imports: [
    CommonModule,
    routing,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  entryComponents: [],
  declarations: [
    PagesComponent,
    DashboardComponent,
    HomeComponent,
    DummyComponent,
    AlertComponent,
    ArticleModal,
    FiremsgComponent,
    UserModal
  ],
  providers: [
    AlertService,
    RequestService
  ]
})
export class PagesModule {
}
