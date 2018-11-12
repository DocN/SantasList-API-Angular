import { Component, OnInit } from '@angular/core';
import {SessionDataService} from '../services/session-data.service';
import  {DashrouteService} from '../services/dashroute.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private currentDashroute =  "";
  constructor(private SessionDataService:SessionDataService, private DashrouteService:DashrouteService) { }

  ngOnInit() {
    this.DashrouteService.currentDashroute = "usersettings";
  }

  setUserSettingDash() {
    this.DashrouteService.currentDashroute = "usersettings";
  }

  setManageChildrenDash() {
    this.DashrouteService.currentDashroute = "managechildren";
  }

  setAddChildDash() {
    this.DashrouteService.currentDashroute = "addchildren";
  }

}
