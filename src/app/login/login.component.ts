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
  information : string[];
  status : number;

  constructor(private router: Router, private api_service: ApiService) { }

    do_login(username: string, password: string){
      this.api_service
       .login(username, password)
       .subscribe(
         data => {
           this.information = data.data as string[];
           this.status = data.status as number;
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
