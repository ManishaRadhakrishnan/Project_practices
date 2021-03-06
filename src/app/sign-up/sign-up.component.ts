import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error: string;
  api: Api;
  status : number;
  role : string;
  information : string;
  constructor(private router: Router, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");

    if(this.role != null && this.role != 'admin') {
      this.router.navigate(["/view-profile"]);
    }
  }

  do_request(full_name: string, email: string, password: string, confirm_password: string, user_role: string) {
    let role = "";
   if (password == confirm_password) {
     if(password.length < 8) {
       this.status = 0;
       this.information = "Password can not be less than 8 characters"
     }
     else {
       if (user_role == 'admin') {
         role = $("#user_role").find(":selected").attr("value");
       }
       else {
         role = "stud";
       }
         this.api_service
         .do_register(full_name, email, password, role)
         .subscribe(
           data => {
             this.status = data.status as number;
             this.information = data.message as string;
             if(this.status == 1) {
               this.router.navigate(['/login']);
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
     this.information = "Password fields donot match";
   }
  }

}
