import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../services/session-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginModel: any = {};
  constructor(private SessionDataService: SessionDataService) { 

  }

  ngOnInit() {
  }

  login() {
    this.SessionDataService.login(this.loginModel);
  }

}
