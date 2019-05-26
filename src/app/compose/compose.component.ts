import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  error: string;
  api : Api
  status : number;
  user_id: string;
  role: string;
  constructor(private router: Router, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role == null) {
      this.router.navigate(["/login"]);
    }
  }

  do_send_mail(email_to: string, subject: string, email_content: string, attachment : string)
  {
    this.user_id = window.sessionStorage.getItem("user_id");
    this.api_service
     .insert_mail(this.user_id, email_to, subject, email_content, attachment)
     .subscribe(
       data => {
         this.status = data.status as number;
         if(this.status == 1) {
           this.router.navigate(['/mail']);
         }
         else{
           alert("This user is not registered");
         }
       },
       err => {
         console.log(err);
         alert("This user is not registered");

       }
     );
  }
}
