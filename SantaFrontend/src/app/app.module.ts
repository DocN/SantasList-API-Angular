import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MainPageComponent } from './main-page/main-page.component';

//routes
import {RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';

//http
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';

//services
import { APIURLService } from './services/apiurl.service';
import { RegisterSuccessComponent } from './register/register-success/register-success.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes:Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'register/success',
    component: RegisterSuccessComponent
  }
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    HttpClientModule,
    HttpModule, 
  ],
  providers: [
    APIURLService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
