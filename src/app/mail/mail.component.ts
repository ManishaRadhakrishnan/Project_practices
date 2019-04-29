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
  constructor(private router: Router,private api_service: ApiService) { }

  ngOnInit() {
    this.api_service
     .fetch_mail("1")
     .subscribe(
       data => {
         this.information = data.data as string[];
         this.mail_count = data.mail_count as number;
         this.status = data.status as number;
           if(this.status == 1)
           {
             this.router.navigate(['/mail']);
           }
       },
       err => {
         console.log(err);
       }
     );
  }
}
