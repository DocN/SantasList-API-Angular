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
import { UserSettingsComponent } from './dashboard/user-settings/user-settings.component';
import { ManageChildrenComponent } from './dashboard/manage-children/manage-children.component';
import { EditChildComponent } from './dashboard/edit-child/edit-child.component';
import { AddChildDataComponent } from './dashboard/add-child-data/add-child-data.component';

//maps
import { AgmCoreModule } from '@agm/core';

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
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'editChild',
    component: EditChildComponent
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
    UserSettingsComponent,
    ManageChildrenComponent,
    EditChildComponent,
    AddChildDataComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    HttpClientModule,
    HttpModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBs_3vSdPPkJbPUH79M-jI7UIwKSCyptTQ'
    })
  ],
  providers: [
    APIURLService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
