import { Component, OnInit } from '@angular/core';
import {SessionDataService} from '../services/session-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private SessionDataService: SessionDataService) { 
    
  }

  ngOnInit() {
  }

}
