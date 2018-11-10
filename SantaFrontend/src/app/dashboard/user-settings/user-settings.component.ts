import { Component, OnInit } from '@angular/core';
import {SessionDataService } from '../../services/session-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { APIURLService} from '../../services/apiurl.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  private userSetting: any = {};
  constructor(private router:Router, private http: HttpClient, private SessionDataService: SessionDataService, private APIURLService: APIURLService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.SessionDataService.getUserData();
  }

  editUserData() {
    let data = {"Id": this.SessionDataService.userData.ChildData.Id, "City": this.SessionDataService.userData.ChildData.City, 
    "Country": this.SessionDataService.userData.ChildData.Country, "FirstName": this.SessionDataService.userData.ChildData.FirstName, 
    "LastName": this.SessionDataService.userData.ChildData.LastName, "Lattitude": this.SessionDataService.userData.ChildData.Lattitude, 
    "Longitude": this.SessionDataService.userData.ChildData.Longitude, "PostalCode": this.SessionDataService.userData.ChildData.PostalCode, 
    "Province": this.SessionDataService.userData.ChildData.Province, "Street": this.SessionDataService.userData.ChildData.Street, 
    "Latitude": this.SessionDataService.userData.ChildData.Latitude, "BirthMonth": this.SessionDataService.userData.BMonth, 
    "BirthDay": this.SessionDataService.userData.BDay, "BirthYear": this.SessionDataService.userData.BYear };
    console.log(data)
    const body = JSON.stringify(data);
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;",
    "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }
    }; 
    this.http.put(this.APIURLService.EditUserDataURL, data, config)
    .subscribe(
    (res) => {
      console.log(res);
    },
    err => {
      console.log(err);
      //finish loading
    }
    );
  }
}
