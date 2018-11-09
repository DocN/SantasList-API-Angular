import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIURLService {

  private domain = "https://localhost:44382/";
  public RegisterURL = "https://localhost:44382/api/auth";
  public test = "https://localhost:44382/api/auth";
  public UserDataURL = this.domain + "api/santalist/";
  public loginURL = "https://localhost:44382/api/auth/login";
  public userDataURL = "https://localhost:44382/api/userdata/";
  constructor() { 

  }
}
