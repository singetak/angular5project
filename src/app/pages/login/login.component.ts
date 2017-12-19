import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../../service/request.service';
import { urlSafeBase64Encoding } from '../../helpers';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  // styleUrls: ['./app.component.css']
})
export class LoginComponent {
  private subscriptions: any[] = <any>[];
  private title = 'Login Page';
  private errorMessage: string = '';
  private loginPassword: string = '123456';
  private emailPassword: string = 'admin@store.com';
  private saveUsername: boolean = true;
  private loading: boolean = false;
  constructor(private router: Router, private requestService: RequestService){
    localStorage.removeItem('currentUser');
    this.requestService.setToken('');
  }
  ngOnInit() {

  }
  private login(){
    this.loading = true;
    this.errorMessage = '';
    let encodedPassword = urlSafeBase64Encoding(this.loginPassword);
    this.requestService.requestLogin(this.emailPassword, encodedPassword, (data, error) => {
      if(error){
        this.errorMessage = error;
      }
      if(data){
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.requestService.currentUser = data;
        this.router.navigate(['/']);
      }else{
        localStorage.removeItem('currentUser');
        this.requestService.currentUser = undefined;
      }
      this.loading = false;
    })
  }
}
