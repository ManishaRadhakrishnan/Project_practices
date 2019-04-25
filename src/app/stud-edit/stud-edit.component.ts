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
  student_data : string[];
  course_names: string[];
  department_names: string[];

  constructor(private api_service: ApiService) { }

  ngOnInit() {
    this.api_service
     .edit_student_profile()
     .subscribe(
       data => {
         this.student_data = data.student_data as string[];
         this.course_names = data.course_names as string[];
         this.department_names = data.department_names as string[];
       },
       err => {
         console.log(err);
       }
     );
 }


  do_update_student_profile(full_name, email, contact, address, course, department)
  {
    let user_id = "1";
    this.api_service.update_student_profile(user_id, full_name, email, contact, address, course, department)
    .subscribe(
      (data: Api) => this.api = { ...data }, // success path
      error => this.error = error // error path
    );
  }
}
