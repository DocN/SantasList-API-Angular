import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {SessionDataService} from '../../services/session-data.service';
import {APIURLService} from '../../services/apiurl.service';
import {ManageChildService } from '../../services/manage-child.service';
import {DashrouteService} from '../../services/dashroute.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.component.html',
  styleUrls: ['./manage-children.component.scss']
})
export class ManageChildrenComponent implements OnInit {

  private loadedData;
  private userData;

  constructor(private router:Router, private http: HttpClient, private SessionDataService: SessionDataService, private APIURLService: APIURLService, private ManageChildService: ManageChildService, private DashrouteService:DashrouteService) { }

  ngOnInit() {
    this.loadedData = false;
    this.getAllUserData();
  }

  getAllUserData() {
    var config = {headers : {
    "Content-Type": "application/json; charset = utf-8;",
    "Authorization": "Bearer " + this.SessionDataService.JWTToken
    }
    }; 
    this.http.get(this.APIURLService.getUserDataSantaURL, config)
    .subscribe(
    (res) => {
      console.log(res);
      this.userData = res;
      this.loadedData = true;
    },
    err => {
      console.log(err);
      //finish loading
    }
    );
  }

  selectChildData($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(13);
    this.ManageChildService.selectedChild = currentID;
    this.ManageChildService.selectedChildID = this.userData[currentID].Id;
    console.log(this.ManageChildService.selectedChildID);
    this.DashrouteService.currentDashroute = "editUser";
  }



}
