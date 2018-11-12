import { Component, OnInit } from '@angular/core';
import {SessionDataService} from '../../services/session-data.service';
import {APIURLService} from '../../services/apiurl.service';
import {ManageChildService } from '../../services/manage-child.service';
import {DashrouteService} from '../../services/dashroute.service';
import { HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-child-data',
  templateUrl: './add-child-data.component.html',
  styleUrls: ['./add-child-data.component.scss']
})
export class AddChildDataComponent implements OnInit {

  private registerModel: any = {};
  private availableUsers;
  private loaded = false;
  private selectedUserID;
  constructor(private router:Router, private http: HttpClient, private SessionDataService: SessionDataService, private APIURLService: APIURLService, private ManageChildService: ManageChildService, private DashrouteService:DashrouteService) { }

  ngOnInit() {
    this.getAvailableUsers();
  }

  getAvailableUsers() {
    var config = {headers : {
      "Content-Type": "application/json; charset = utf-8;",
      "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }}; 
    
    this.http.get(this.APIURLService.childrenWithoutDataURL, config)
    .subscribe(
    (res) => {
      console.log(res);
      this.availableUsers = res;
      this.loaded = true;
    },
    err => {
      console.log(err);
      //finish loading
    }
    );
  }

  selectedUser(event) {
    console.log(event);
    this.clearTables();
    let tableRow = document.getElementById(event.UID);
    this.selectedUserID = event.UID;
    tableRow.className = "table-primary";
  }
  clearTables() {
    for(let i =0; i < this.availableUsers.length; i++) {
      let innerRow = document.getElementById(this.availableUsers[i].UID);
      innerRow.className = "";
    }
  }

  addUserChildData() {
    let data = {"FirstName": this.registerModel.FirstName, 
                "LastName": this.registerModel.LastName, "Street": this.registerModel.Street, 
                "City": this.registerModel.City, "Province": this.registerModel.Province, 
                "PostalCode": this.registerModel.PostalCode, "Country": this.registerModel.Country, 
                "Latitude": this.registerModel.Latitude, "Longitude": this.registerModel.Longitude, 
                "BirthMonth": this.registerModel.BMonth, "BirthDay": this.registerModel.BDate, 
                "BirthYear": this.registerModel.BYear };
    console.log(data)
    const body = JSON.stringify(data);
    let addURL = this.APIURLService.addChildDataURL + this.selectedUserID;
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;",
    "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }
    }; 
    this.http.post(addURL, data, config)
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
