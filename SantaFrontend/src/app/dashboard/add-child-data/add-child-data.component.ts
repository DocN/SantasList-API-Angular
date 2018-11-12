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

  selectedUser($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(13);
    console.log(currentID);
  }
}
