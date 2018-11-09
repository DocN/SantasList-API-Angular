import { Component, OnInit } from '@angular/core';
import {SessionDataService } from '../../services/session-data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(private SessionDataService: SessionDataService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.SessionDataService.getUserData();
  }

}
