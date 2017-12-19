import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/index';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoginComponent } from './pages/login/login.component'

export const routes: Routes = [
  { path: '', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  //{ path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
