import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  user_id: string;
  status : number;
  information : string;

  constructor(private router: Router,private api_service: ApiService) { }

  ngOnInit() {
    this.user_id = window.sessionStorage.getItem("user_id");
    if(this.user_id == null) {
      this.router.navigate(["/login"]);
    }
  }

  update_password(password : string, confirm_password : string) {
    if(password == confirm_password) {
      if(password.length < 8) {
        this.status = 0;
        this.information = "Password cannot be smaller than 8 characters";
      }
      else {
        this.api_service
        .update_password(this.user_id, password)
        .subscribe(
         data => {
           this.status = data.status as number;
           this.information = data.message as string;
           if(this.status == 1)
             {
                this.router.navigate(['/student-profile']);
             }
         },
         err => {
           console.log(err);
         }
       );
      }
    }
    else {
      this.status = 0;
      this.information = "Two password fields do not match";
    }
  }
}
