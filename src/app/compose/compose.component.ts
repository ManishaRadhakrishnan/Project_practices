import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  error: string;
  api : Api
  constructor(private api_service: ApiService) { }

  ngOnInit() {
  }

  do_send_mail(email_to: string, subject: string, email_cc: string, email_bcc: string, email_content: string)
  {
    let user_id = "1";
    this.api_service.insert_mail(user_id, email_to, subject, email_cc, email_bcc, email_content)
    .subscribe(
      (data: Api) => this.api = { ...data }, // success path
      error => this.error = error // error path
    );
  }
}
