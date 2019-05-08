import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as $AB from 'jquery';
@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  constructor(private router: Router,private api_service: ApiService) { }
  information : string[];
  mail_count : number;
  status : number;
  user_id: string;
  role: string;
  inbox_content : string;
  sent_mail_content : string[];
  mail : string;
  ngOnInit() {
      // window.location.reload();
      this.role = window.sessionStorage.getItem("role");
      this.mail = window.sessionStorage.getItem("mail");
      if(this.role != null) {
        this.user_id = window.sessionStorage.getItem("user_id");
        this.api_service
        .sent_mail(this.user_id)
        .subscribe(
          data => {
            this.information = data.data as string[];
            this.mail_count = data.mail_count as number;
            this.status = data.status as number;
          },
          err => {
            console.log(err);
          }
        );
      }
      else {
        this.router.navigate(["/login"]);
      }

    }
}
