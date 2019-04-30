import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-stud-prof',
  templateUrl: './stud-prof.component.html',
  styleUrls: ['./stud-prof.component.css']
})
export class StudProfComponent implements OnInit {

  information : string[];
  status : number;
  role : string;
  user_id : string;

  constructor(private router: Router, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud"){
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
      .view_student_profile(this.user_id)
      .subscribe(
        data => {
          this.information = data.data as string[];
          this.status = data.status as number;
        },
        err => {
          console.log(err);
        }
      );
    }
      else if(this.role == "cood"){
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
      .view_cood_profile(this.user_id)
      .subscribe(
        data => {
          this.information = data.data as string[];
          this.status = data.status as number;
        },
        err => {
          console.log(err);
        }
      );
    }
      else if(this.role == "guide"){
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
      .view_guide_profile(this.user_id)
      .subscribe(
        data => {
          this.information = data.data as string[];
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
