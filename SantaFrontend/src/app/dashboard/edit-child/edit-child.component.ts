import { Component, OnInit } from '@angular/core';
import {SessionDataService} from '../../services/session-data.service';
import {APIURLService} from '../../services/apiurl.service';
import {ManageChildService } from '../../services/manage-child.service';
import {DashrouteService} from '../../services/dashroute.service';
import { HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { S_IFREG } from 'constants';
@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss']
})
export class EditChildComponent implements OnInit {

  private currentChildData;
  private loaded = false;
  private showDeleteFrame = false;
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
}
