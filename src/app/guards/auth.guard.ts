import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RequestService } from '../service/request.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router
      //, private requestService: RequestService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if(this.legitUser(currentUser)){
              // this.requestService.currentUser = currentUser;
              return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    private legitUser(user): boolean{
      if(user.hasOwnProperty('uid') && user.hasOwnProperty('type') && user.hasOwnProperty('token')){
        return true;
      }else{
        return false;
      }
    }
}
