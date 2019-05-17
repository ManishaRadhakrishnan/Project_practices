import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as $AB from 'jquery';
import { Observable }         from 'rxjs';
import { ActivatedRoute }     from '@angular/router';
import { map }                from 'rxjs/operators';

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
  mail_role :string;
  constructor(private router: Router,private api_service: ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    this.mail = window.sessionStorage.getItem("mail");
    if(this.role == '') {
      this.router.navigate(["/login"]);
    }else{
      this.mail_role = this.route.snapshot.paramMap.get("mail_role");
      this.route.queryParamMap.subscribe(queryParams => {
        this.mail_role = queryParams.get("mail_role");
      });
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
      .trash_mail(this.mail,this.user_id,this.role,this.mail_role)
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
