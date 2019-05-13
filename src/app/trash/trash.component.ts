import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as $AB from 'jquery';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
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
      .trash_mail(this.mail,this.user_id,this.role)
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

  redirect()
  {
    this.router.navigate(["/mail"]);
  }

  _reload()
  {
    this.router.navigate(["/sent"]);
  }

  load()
  {
    this.router.navigate(["/trash"]);
  }
}
