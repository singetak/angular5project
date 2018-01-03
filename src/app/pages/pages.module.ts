import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { AlertComponent } from '../directives/index';

import { PagesComponent } from './pages.component';
import { AlertService, RequestService } from 'app/service/index';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { ArticleModal } from './dashboard/components/articleModal';
import { FiremsgComponent } from './common/firemsg';
import { UserModal } from './dashboard/components/userModal';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  imports: [
    CommonModule,
    routing,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  entryComponents: [],
  declarations: [
    PagesComponent,
    DashboardComponent,
    HomeComponent,
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
