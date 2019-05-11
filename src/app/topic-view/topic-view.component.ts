import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import * as $AB from 'jquery';
@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit {

  constructor(private router: Router, private api_service: ApiService) { }
  information : string[];
  status : number;
  role: string;
  user_id : string;

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud") {
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
       .project_details(this.user_id)
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
     else if(this.role == "guide") {
       this.user_id = window.sessionStorage.getItem("user_id");
       this.api_service
        .student_project_details(this.user_id)
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
        // this.user_id = window.sessionStorage.getItem("user_id");
        this.api_service
         .all_project_details()
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

  edit_topic(project_id) {
  // this.button=true;
  this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud") {
       this.router.navigate(["/submit-topic"], { queryParams: { project_id: project_id } });
     }
     else {
       this.router.navigate(["/login"]);
     }
    }

  make_suggestion(project_id,student_id){
this.role = window.sessionStorage.getItem("role");
  if(this.role == 'guide') {
     this.router.navigate(["/suggestion"], { queryParams: { project_id: project_id, student_id: student_id } });
   }
   else {
     this.router.navigate(["/login"]);
   }
}

  modal_pop(div_id) {
  let id = "#" + div_id;
  $(id).modal();
}

  submit_new_topic(){
    this.router.navigate(['/submit-topic']);
  }

  get_upper_case_text(text) {
    return text.charAt(0).toUpperCase() + text.slice(1, text.length);
  }
}
