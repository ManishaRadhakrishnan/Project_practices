import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
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
  status : string;
  update_status : string;
  role : string;

  constructor(private router: Router,private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud") {
      this.api_service
      .edit_student_profile()
      .subscribe(
       data => {
         this.student_data = data.student_data as string[];
         this.course_names = data.course_names as string[];
         this.department_names = data.department_names as string[];
         this.status = data.status as string;
       },
       err => {
         console.log(err);
       }
     );
    }
    else {
      this.router.navigate(["/login"])
    }
 }


  do_update_student_profile(full_name, email, contact, address, course, department) {
    let user_id = "1";
    this.api_service
     .update_student_profile(user_id, full_name, email, contact, address, course, department)
     .subscribe(
       data => {
         this.update_status = data.status as string;
       },
       err => {
         console.log(err);
       }
     );
  }
}
