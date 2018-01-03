import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'app/service';
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.scss']
})
export class PagesComponent {
  constructor(private router: Router, private requestService: RequestService) {
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.requestService.currentUser = currentUser;
    }
  }
  private logout() {
    localStorage.removeItem('currentUser');
    this.requestService.currentUser = {};
    this.router.navigate(['/login']);
  }
}
