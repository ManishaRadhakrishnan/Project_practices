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

  constructor(private router: Router, private api_service: ApiService) { }

    ngOnInit() {
      this.role = window.sessionStorage.getItem("role");
      if(this.role != null) {
        if (this.role == "stud") {
          this.router.navigate(["/student-profile"]);
        }
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
           if(this.status == 1)
           {
             this.router.navigate(['/student-profile']);
             window.sessionStorage.setItem("role", this.role);
             window.sessionStorage.setItem("user_id", this.user_id);
           }
         },
         err => {
           console.log(err);
         }
       );
    }
}
