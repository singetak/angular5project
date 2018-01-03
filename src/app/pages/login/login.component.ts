import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'app/service/request.service';
import { urlSafeBase64Encoding } from 'app/helpers';
import { environment } from 'app/../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  // styleUrls: ['../../app.component.scss']
})
export class LoginComponent {
  private subscriptions: any[] = <any>[];
  public title = 'Login Page';
  public errorMessage: string = '';
  public loginPassword: string = environment.password;
  public emailPassword: string = environment.userName;
  public saveUsername: boolean = true;
  public loading: boolean = false;
  constructor(private router: Router, private requestService: RequestService) {
    localStorage.removeItem('currentUser');
    this.requestService.setToken('');
  }
  ngOnInit() {

  }
  public login() {
    this.loading = true;
    this.errorMessage = '';
    let encodedPassword = urlSafeBase64Encoding(this.loginPassword);
    this.requestService.requestLogin(this.emailPassword, encodedPassword, (data, error) => {
      if (error) {
        this.errorMessage = error;
      }
      if (data) {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.requestService.currentUser = data;
        this.router.navigate(['/pages/dashboard']);
      }else {
        localStorage.removeItem('currentUser');
        this.requestService.currentUser = undefined;
      }
      this.loading = false;
    });
  }
}
