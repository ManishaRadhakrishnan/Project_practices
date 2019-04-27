import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  information : string[];
  mail_count : number;

  constructor(private api_service: ApiService) { }

  ngOnInit() {
    this.api_service
     .fetch_mail("1")
     .subscribe(
       data => {
         this.information = data.data as string[];
         this.mail_count = data.mail_count as number;
       },
       err => {
         console.log(err);
       }
     );
  }
}
