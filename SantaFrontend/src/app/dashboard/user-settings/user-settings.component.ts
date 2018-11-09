import { Component, OnInit } from '@angular/core';
import {SessionDataService } from '../../services/session-data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  private userSetting: any = {};
  constructor(private SessionDataService: SessionDataService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.SessionDataService.getUserData();
  }

  setUserData() {
    /*
    let data = {"Id": this.registerModel.Email, "Username": this.registerModel.Username, 
    "Password": this.registerModel.Password, "FirstName": this.registerModel.FirstName, 
    "LastName": this.registerModel.LastName, "Street": this.registerModel.Street, 
    "City": this.registerModel.City, "Province": this.registerModel.Province, 
    "PostalCode": this.registerModel.PostalCode, "Country": this.registerModel.Country, 
    "Latitude": this.registerModel.Latitude, "Longitude": this.registerModel.Longitude, 
    "BirthMonth": this.registerModel.BMonth, "BirthDay": this.registerModel.BDate, 
    "BirthYear": this.registerModel.BYear };
    const body = JSON.stringify(data);
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;"
    }
    }; 
    this.http.post(this.APIURLService.RegisterURL, data, config)
    .subscribe(
    (res) => {
    console.log(res);
    if(res["response"] == true) {
    this.router.navigate(['/register/success']);
    }
    },
    err => {
    console.log(err);
    //finish loading
    }
    );
    */
  }
}
