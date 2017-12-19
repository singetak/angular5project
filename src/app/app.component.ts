import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from './service/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private requestService: RequestService){
  }
  title = 'app';
  private logout(){
    localStorage.removeItem('currentUser');
    this.requestService.currentUser = {};
    this.router.navigate(['/login']);
  }
}
