import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../service';
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.scss']
})
export class PagesComponent {
  constructor(private router: Router, private requestService: RequestService) {
  }
  private logout() {
    localStorage.removeItem('currentUser');
    this.requestService.currentUser = {};
    this.router.navigate(['/login']);
  }
}
