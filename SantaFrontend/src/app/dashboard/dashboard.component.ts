import { Component, OnInit } from '@angular/core';
import {SessionDataService} from '../services/session-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private currentDashroute =  "";
  constructor(private SessionDataService:SessionDataService) { }

  ngOnInit() {
    this.currentDashroute = "usersettings";
  }

  setUserSettingDash() {
    this.currentDashroute = "usersettings";
  }

  setManageChildrenDash() {
    this.currentDashroute = "managechildren";
  }

}
