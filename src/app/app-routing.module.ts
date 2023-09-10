import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { AppComponent } from './app.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, ...canActivate(redirectToDashboard)}, 
  { path: 'sign-up', component: SignUpComponent, ...canActivate(redirectToDashboard)}, 
  { path: 'dashboard', component: DashboardComponent , ...canActivate(redirectToLogin)}, 
  { path: 'user', component: UserComponent, ...canActivate(redirectToLogin) }, 
  { path: 'user/:id', component: UserDetailComponent, ...canActivate(redirectToLogin)  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
