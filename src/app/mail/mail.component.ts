import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Observable }         from 'rxjs';
import { ActivatedRoute }     from '@angular/router';
import { map }                from 'rxjs/operators';

import * as $AB from 'jquery';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  information : string[];
  mail_count : number;
  status : number;
  user_id: string;
  role: string;
  inbox_content : string;
  sent_mail_content : string[];
  mail : string;
  mail_role :string;
  constructor(private router: Router,private api_service: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    this.mail = window.sessionStorage.getItem("mail");
    if(this.role == '') {
      this.router.navigate(["/login"]);
    }
    else {
      this.mail_role = this.route.snapshot.paramMap.get("mail_role");
      this.route.queryParamMap.subscribe(queryParams => {
        this.mail_role = queryParams.get("mail_role");
      });

      this.load_email(this.mail_role);
  }
}

  load_email(mail_role : string) {
  this.user_id = window.sessionStorage.getItem("user_id");
  this.api_service
  .inbox_mail(this.user_id, mail_role, this.mail)
  .subscribe(
    data => {
      this.status = data.status as number;
      if(this.status == 1) {
        this.information = data.data as string[];
      }
      this.mail_count = data.mail_count as number;
    },
    err => {
      console.log(err);
    }
  );
}

  needed_role() {

    this.role = window.sessionStorage.getItem("role");
      console.log(this.mail_role);
      if(this.role != '') {
         this.router.navigate(["/sent"], { queryParams: { mail_role: this.mail_role} });
       }
       else {
         this.router.navigate(["/login"]);
       }
    }

  redirect() {
    this.router.navigate(["/sent"]);
  }

  reload() {
    this.router.navigate(["/mail"]);
  }

  load() {
    this.router.navigate(["/trash"]);
  }

  move_mail(mail_id: string) {
    this.user_id = window.sessionStorage.getItem("user_id");
    this.api_service
    .move_mail(mail_id)
    .subscribe(
      data => {
        this.status = data.status as number;
        if (this.status) {
          window.location.reload();
        }
        else {
          alert("Unable to delete message. Please try again later");
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  needed_role_trash() {

      this.role = window.sessionStorage.getItem("role");
        console.log(this.mail_role);
        if(this.role != '') {
           this.router.navigate(["/trash"], { queryParams: { mail_role: this.mail_role} });
         }
         else {
           this.router.navigate(["/login"]);
         }
      }
}
