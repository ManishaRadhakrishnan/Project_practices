import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Observable }         from 'rxjs';
import { ActivatedRoute }     from '@angular/router';
import { map }                from 'rxjs/operators';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  sugg_status : string;
  suggestion : string;
  proj_id :string;
  user_id :string;
  stud_id :string;
  role : string;
  project_id : any;
  student_id : any;
  constructor(private router: Router, private route: ActivatedRoute, private api_service: ApiService) { }

  ngOnInit() {
  this.role = window.sessionStorage.getItem("role");
  if(this.role != 'guide') {
    this.router.navigate(["/login"]);
  }
  else {
  this.project_id = this.route.snapshot.paramMap.get("project_id");
  this.route.queryParamMap.subscribe(queryParams => {
    this.project_id = queryParams.get("project_id");
    // console.log(this.project_id);
      })
    this.student_id = this.route.snapshot.paramMap.get("student_id");
    this.route.queryParamMap.subscribe(queryParams => {
      this.student_id = queryParams.get("student_id");
      // console.log(this.student_id);
        })
    if(this.student_id == null && this.project_id == null){
      alert("Select a topic to make suggestion....!");
      this.router.navigate(["/topic-view"]);
    }
  }
  // window.location.reload();
  }


do_suggestion(suggestion :string){
  this.user_id = window.sessionStorage.getItem("user_id");
  // this.stud_id = window.sessionStorage.getItem("stud_id");
  // this.proj_id = window.sessionStorage.getItem("proj_id");

  this.api_service
     .do_suggestion(this.user_id, this.student_id, this.project_id, suggestion)
     .subscribe(
       data => {
         this.sugg_status = data.status as string;
       },
       err => {
         console.log(err);
       }
     );
  }
}
