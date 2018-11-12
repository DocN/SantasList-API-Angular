import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIURLService {

  /*
  private domain = "https://localhost:44382/";
  public RegisterURL = "https://localhost:44382/api/auth";
  public test = "https://localhost:44382/api/auth";
  public UserDataURL = this.domain + "api/santalist/";
  public loginURL = "https://localhost:44382/api/auth/login";
  public userDataURL = "https://localhost:44382/api/userdata/";
  public EditUserDataURL = "https://localhost:44382/api/userdata/";
  public getUserDataSantaURL = "https://localhost:44382/api/santalist/";
  public santaEditChildURL = "https://localhost:44382/api/santalist/editChild/";
  public santaNaughtyChildURL = "https://localhost:44382/api/santalist/naughty/";
  public childrenWithoutDataURL = "https://localhost:44382/api/santalist/childrenWithoutData";
  public addChildDataURL = "https://localhost:44382/api/santalist/addChildData/";
  */
  private domain = "https://santaapi.azurewebsites.net/";
  public RegisterURL = this.domain + "api/auth";
  public test = this.domain + "api/auth";
  public UserDataURL = this.domain + "api/santalist/";
  public loginURL = this.domain + "api/auth/login";
  public userDataURL = this.domain + "api/userdata/";
  public EditUserDataURL = this.domain + "api/userdata/";
  public getUserDataSantaURL = this.domain + "api/santalist/";
  public santaEditChildURL = this.domain +"api/santalist/editChild/";
  public santaNaughtyChildURL = this.domain + "api/santalist/naughty/";
  public childrenWithoutDataURL = this.domain + "api/santalist/childrenWithoutData";
  public addChildDataURL =  this.domain + "api/santalist/addChildData/";
  
  constructor() { 

  }
}
