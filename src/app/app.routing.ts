import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './guards/index';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NoContentComponent } from './pages/no-content';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: '**', component: NoContentComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
