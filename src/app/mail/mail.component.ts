import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';

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
  constructor(private router: Router,private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role != null) {
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
      .fetch_mail(this.user_id)
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
