import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingComponent } from './landing/landing.component';
import {canActivate, redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['login'])
const redirectToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path:'home',
    component: HomeComponent,
    ...canActivate(redirectToLogin)
  },
  {
    path:'login',
    component: LoginComponent,
    ...canActivate(redirectToHome)
  },
  {
    path:'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectToHome)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
