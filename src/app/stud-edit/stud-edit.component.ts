import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';

@Component({
  selector: 'app-stud-edit',
  templateUrl: './stud-edit.component.html',
  styleUrls: ['./stud-edit.component.css']
})
export class StudEditComponent implements OnInit {
  error: string;
  api: Api;
  constructor(private api_service: ApiService) { }
  ngOnInit() { }

  do_update_request(first_name, last_name, email, contact, address, course, department)
  {
    let full_name = first_name + " " + last_name;
    this.api_service.do_update(full_name, email, contact, address, course, department)
    .subscribe(
      (data: Api) => this.api = { ...data }, // success path
      error => this.error = error // error path
    );
  }
}
