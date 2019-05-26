import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  user_id : string;
  role : string;
  status : number;
  user_name : string;
  message : string;

  constructor(private router: Router, private api_service: ApiService) { }

    ngOnInit() {
      this.role = window.sessionStorage.getItem("role");

      if(this.role != null) {
        if (this.role == "admin") {
          this.router.navigate(["/register"]);
        }
        else {
          this.router.navigate(["/view-profile"]);

        }
      }
      else {
        this.router.navigate(["/login"]);
      }
      }


    do_login(username: string, password: string){
      this.api_service
       .login(username, password)
       .subscribe(
         data => {
           this.role = data.role as string;
           this.user_id = data.user_id as string;
           this.status = data.status as number;
           this.user_name = data.user_name as string;
           this.message = data.message as string;
           if(this.status == 1)
           {
             this.router.navigate(['/view-profile']);
             window.sessionStorage.setItem("role", this.role);
             window.sessionStorage.setItem("user_id", this.user_id);
             window.sessionStorage.setItem("mail", username);
             window.sessionStorage.setItem("user_name", this.user_name);
             // console.log(window.sessionStorage.getItem("mail"));
             location.reload();
           }
         },
         err => {
           console.log(err);
         }
       );
    }
}
