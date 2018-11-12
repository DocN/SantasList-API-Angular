import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APIURLService } from '../services/apiurl.service';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {
  public JWTToken = "";
  public expire = "";
  public loggedIn = false;
  public userData : any;
  public loadedUserData = false;
  public noUserData = false;
  private jwtType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  public role;
  constructor(private router:Router, private http: HttpClient, private APIURLService: APIURLService) {

  }

  login(loginModel) {
    console.log("here");
    let data = {"Username": loginModel.Email, "Password": loginModel.Password };
    const body = JSON.stringify(data);
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;"
    }
    }; 
    this.http.post(this.APIURLService.loginURL, data, config)
    .subscribe(
    (res) => {
      this.JWTToken = res["token"];
      this.expire = res["expiration"];
      this.decodeToken(res['token']);
      this.loggedIn = true;
      this.router.navigate(['/dashboard']);
    },
    err => {
    console.log(err);
    //finish loading
    }
    );
  }

  logout() {
    this.JWTToken = "";
    this.expire = "";
    this.loggedIn = false;
    this.loadedUserData = false;
    this.userData = '';
  }

  getUserData() {
    console.log("get user");
    if(this.loggedIn == false) {
      console.log("not logged in");
      return;
    }
    var config = {headers : {
    "Authorization": "Bearer " + this.JWTToken
    }
    }; 
    this.http.get(this.APIURLService.userDataURL, config)
    .subscribe(
    (res) => {
      console.log(res);
      this.userData = res;
      this.loadedUserData = true;
      this.noUserData = false;
    },
    err => {
      console.log(err);
      this.noUserData = true;
      //finish loading
    });
  }

  decodeToken(token) {
    let jwt = token;
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    console.log(decodedJwtData);
    if(decodedJwtData != null) {
      this.role = decodedJwtData[this.jwtType];
      console.log(this.role);
    }
    let isAdmin = decodedJwtData.admin
  }
}
