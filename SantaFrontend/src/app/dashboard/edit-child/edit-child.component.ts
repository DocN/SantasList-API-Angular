import { Component, OnInit } from '@angular/core';
import {SessionDataService} from '../../services/session-data.service';
import {APIURLService} from '../../services/apiurl.service';
import {ManageChildService } from '../../services/manage-child.service';
import {DashrouteService} from '../../services/dashroute.service';
import { HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss']
})
export class EditChildComponent implements OnInit {

  private currentChildData;
  private loaded = false;
  private showDeleteFrame = false;
  private showNaughtyFrame = false;
  private birthdate: any = {}; 
  constructor(private router:Router, private http: HttpClient, private SessionDataService: SessionDataService, private APIURLService: APIURLService, private ManageChildService: ManageChildService, private DashrouteService:DashrouteService) { }

  ngOnInit() {
    this.loadChildData();
  }

  loadChildData() {
    var config = {headers : {
      "Content-Type": "application/json; charset = utf-8;",
      "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }}; 
    let editUserUrl = this.APIURLService.santaEditChildURL + this.ManageChildService.selectedChildID;
    console.log(editUserUrl);
    this.http.get(editUserUrl, config)
    .subscribe(
    (res) => {
      console.log(res);
      this.currentChildData = res;
      this.birthdate.BDay = this.currentChildData.BirthDay;
      this.birthdate.BMonth = this.currentChildData.BirthMonth;
      this.birthdate.BYear = this.currentChildData.BirthYear;
      this.loaded = true;
    },
    err => {
      console.log(err);
      //finish loading
    }
    );
  }

  showDelFrame() {
    if(this.showDeleteFrame == true) {
      this.showDeleteFrame = false;
    }
    else {
      this.showDeleteFrame = true;
    }
  }

  editUserData() {
    let data = {"Uid": this.currentChildData.UID, "Firstname": this.currentChildData.myChildData.FirstName, 
    "Lastname": this.currentChildData.myChildData.LastName, "Street": this.currentChildData.myChildData.Street, 
    "City": this.currentChildData.myChildData.Longitude, "Province": this.currentChildData.myChildData.Longitude, 
    "PostalCode": this.currentChildData.myChildData.PostalCode, "Country": this.currentChildData.myChildData.Country, 
    "Latitude": this.currentChildData.myChildData.Latitude, "Longitude": this.currentChildData.myChildData.Longitude, 
    "BirthDay": this.birthdate.BDay, "BirthMonth": this.birthdate.BMonth, 
    "BirthYear": this.birthdate.BYear};

    const body = JSON.stringify(data);
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;",
    "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }
    }; 
    this.http.put(this.APIURLService.santaEditChildURL, data, config)
    .subscribe(
    (res) => {
      console.log(res);
      this.DashrouteService.currentDashroute = "managechildren";
    },
    err => {
      console.log(err);
      //finish loading
    }
    );
  }

  setNaughtyTrue() {
    this.editNaughtyStatus(true);
  }
  setNaughtyFalse() {
    this.editNaughtyStatus(false);
  }
  editNaughtyStatus(newStatus) {
    let data = {"IsNaughty": newStatus};

    const body = JSON.stringify(data);
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;",
    "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }
    }; 
    let naughtyURL = this.APIURLService.santaNaughtyChildURL + this.currentChildData.UID;
    this.http.post(naughtyURL, data, config)
    .subscribe(
    (res) => {
      console.log(res);
      this.currentChildData.myChildData.IsNaughty = newStatus;
    },
    err => {
      console.log(err);
      //finish loading
    }
    );
  }

  setNaughtyFrame() {
    if(this.showNaughtyFrame == true) {
      this.showNaughtyFrame = false;
    }
    else {
      this.showNaughtyFrame = true;
    }
  }

  naughtyConfirm() {
    this.setNaughtyFrame();
  }

  deleteContact() {
    let data = {};

    const body = JSON.stringify(data);
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;",
    "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }
    }; 
    let deleteUrl = this.APIURLService.getUserDataSantaURL + this.currentChildData.UID;
    this.http.delete(deleteUrl, config)
    .subscribe(
    (res) => {
      console.log(res);
      this.DashrouteService.currentDashroute = "managechildren";
    },
    err => {
      console.log(err);
      //finish loading
    }
    );
  }
}
