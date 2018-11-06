import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URLServiceService } from '../services/urlservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerModel: any = {};
  
  constructor(private router:Router, private http: HttpClient, private urlserviceservice) { }

  ngOnInit() {
  }

  registerUser() {
    /*
    this.http.post(this.loginurl, data)
    .subscribe(
      (res) => {
      },
      err => {
        console.log(err);
        //finish loading
      }
  );
  */
  }

}
