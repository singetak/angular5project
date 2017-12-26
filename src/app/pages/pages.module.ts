import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { AlertComponent } from '../directives/index';

import { PagesComponent } from './pages.component';
import { AlertService, RequestService } from '../service/index';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { ArticleModal } from './dashboard/components/articleModal';
import { FiremsgComponent } from './dashboard/components/firemsg';
import { UserModal } from './dashboard/components/userModal';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    routing,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [],
  declarations: [
    PagesComponent,
    DashboardComponent,
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
