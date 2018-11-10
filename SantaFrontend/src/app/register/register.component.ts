import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIURLService } from '../services/apiurl.service';
import { SessionDataService} from '../services/session-data.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerModel: any = {};
  
  constructor(private router:Router, private http: HttpClient, private APIURLService: APIURLService, private SessionDataService:SessionDataService) { 

  }

  ngOnInit() {
  }

  registerUser() {
    let data = {"Email": this.registerModel.Email, "Username": this.registerModel.Username, 
                "Password": this.registerModel.Password, "FirstName": this.registerModel.FirstName, 
                "LastName": this.registerModel.LastName, "Street": this.registerModel.Street, 
                "City": this.registerModel.City, "Province": this.registerModel.Province, 
                "PostalCode": this.registerModel.PostalCode, "Country": this.registerModel.Country, 
                "Latitude": this.registerModel.Latitude, "Longitude": this.registerModel.Longitude, 
                "BirthMonth": this.registerModel.BMonth, "BirthDay": this.registerModel.BDate, 
                "BirthYear": this.registerModel.BYear };
    const body = JSON.stringify(data);
    var config = {headers : {
      "Content-Type": "application/json; charset = utf-8;"
      }
    }; 
    this.http.post(this.APIURLService.RegisterURL, data, config)
      .subscribe(
        (res) => {
          console.log(res);
          if(res["response"] == true) {
            this.router.navigate(['/register/success']);
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

}
