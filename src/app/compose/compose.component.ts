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
  status : string;
  constructor(private router: Router, private api_service: ApiService) { }

  ngOnInit() {
  }

  do_send_mail(email_to: string, subject: string, email_cc: string, email_bcc: string, email_content: string, attachment : string)
  {
    let user_id = "1";

    if(attachment == null) {
      attachment = "";
    }
    this.api_service
     .insert_mail(user_id, email_to, subject, email_cc, email_bcc, email_content, attachment)
     .subscribe(
       data => {
         this.status = data.status as string;
         if(this.status == "1") {
           this.router.navigate(['/mail']);
         }
       },
       err => {
         console.log(err);
       }
     );
  }
}
