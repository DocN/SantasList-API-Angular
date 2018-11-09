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
      console.log(res);
      this.JWTToken = res["token"];
      this.expire = res["expiration"];
      this.router.navigate(['/dashboard']);
    },
    err => {
    console.log(err);
    //finish loading
    }
    );
  }

}
