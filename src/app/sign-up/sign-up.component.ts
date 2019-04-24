import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error: string;
  api: Api;
  constructor(private api_service: ApiService) { }

  ngOnInit() {
  }

  do_request(full_name: string, email: string, username: string, password: string, confirm_password: string, role: string)
  {
    if (password == confirm_password)
    {
      this.api_service.do_register(full_name, email, username, password, role)
      .subscribe(
        (data: Api) => this.api = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  }

}
