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

  do_send_mail(email_to: string, email_cc: string, email_bcc: string, email_content: string)
  {
    this.api_service.insert_mail(email_to, email_cc, email_bcc, email_content)
    .subscribe(
      (data: Api) => this.api = { ...data }, // success path
      error => this.error = error // error path
    );
  }
}
