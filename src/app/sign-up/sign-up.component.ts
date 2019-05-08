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
  status : string;
  role : string;
  constructor(private router: Router, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");

    if(this.role != null) {
      if (this.role == "stud") {
        this.router.navigate(["/student-profile"]);
      }
    }
  }

  do_request(full_name: string, email: string, username: string, password: string, confirm_password: string, role: string) {

   if (password == confirm_password) {
    this.api_service
     .do_register(full_name, email, username, password, role)
     .subscribe(
       data => {
         this.status = data.status as string;
         if(this.status == "1") {
           this.router.navigate(['/login']);
         }
       },
       err => {
         console.log(err);
       }
     );
   }
   else {
     this.status = "0";
   }
  }

}
