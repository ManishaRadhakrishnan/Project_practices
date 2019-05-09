import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
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
  constructor(private router: Router,private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    this.mail = window.sessionStorage.getItem("mail");
    if(this.role != null) {
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
      .inbox_mail(this.mail)
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

  // get_sent_mail() {
  //   // window.location.reload();
  //   this.user_id = window.sessionStorage.getItem("user_id");
  //   this.api_service
  //   .sent_mail(this.user_id)
  //   .subscribe(
  //     data => {
  //       this.mail_count = data.mail_count as number;
  //       this.status = data.status as number;
  //       this.sent_mail_content = data.data as string[];
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  //
  //   this.inbox_content = $("#right-mail-content").html();
  //   // $("#right-mail-content").html("test");
  //   // $("#inbox-mail").removeClass("active");
  //   // $("#sent-mail").addClass("active");
  //   $("#right-mail-content").html(this.sent_mail_content);
  //   $("#inbox-mail").removeClass("active");
  //   $("#sent-mail").addClass("active");
  // }

  get_inbox_mail() {

    this.user_id = window.sessionStorage.getItem("user_id");
    this.mail = window.sessionStorage.getItem("mail");
    this.api_service
    .inbox_mail(this.mail)
    .subscribe(
      data => {
        this.information = data.data as string[];
        this.mail_count = data.mail_count as number;
        this.status = data.status as number;
        console.log(this.information);
      },
      err => {
        console.log(err);
      }
    );

    // for(number in this.information) {
    //     inbox_content += "<tr  data-toggle=\"modal\" data-target=\"information[\"user_id\"]\"><td class=\"small-col\"><input type=\"checkbox\" /></td><td class=\"name\"><a href=\"#\">information[\"name\"]</a></td><td class=\"subject\"><a href=\"#\">information[\"content\"]</a></td><td class=\"time\">information[\"timestamp\"]</td></tr>";
    //
    // }

    $("#right-mail-content").html(this.inbox_content);
    $("#sent-mail").removeClass("active");
    $("#inbox-mail").addClass("active");
  }

  redirect()
  {
    this.router.navigate(["/sent"]);
  }

  reload()
  {
    this.router.navigate(["/mail"]);
  }

  load()
  {
    this.router.navigate(["/trash"]);
  }
  move_mail(mail_id: string){
    this.user_id = window.sessionStorage.getItem("user_id");
    // this.mail = window.sessionStorage.getItem("mail");
    this.api_service
    .move_mail(mail_id)
    .subscribe(
      data => {
        this.information = data.data as string[];
        this.mail_count = data.mail_count as number;
        this.status = data.status as number;
        // console.log(this.information);
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
  }
}
