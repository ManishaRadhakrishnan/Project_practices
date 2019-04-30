import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-topic-sub',
  templateUrl: './topic-sub.component.html',
  styleUrls: ['./topic-sub.component.css']
})
export class TopicSubComponent implements OnInit {

  error: string;
  api: Api;
  user_id : string;
  role: string;
  status : string;
  information:string[];
  
  constructor(private router: Router, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role = null) {
      this.router.navigate(["/login"]);
    }
  }

  do_submit_topic(project_title: string, project_domains: string, project_technologies: string, project_description: string)
  {
    this.user_id = window.sessionStorage.getItem("user_id");
    this.api_service
     .do_add_project_topic(this.user_id, project_title, project_domains, project_technologies, project_description)
     .subscribe(
       data => {
         this.status = data.status as string;
       },
       err => {
         console.log(err);
       }
     );
  }
  
  do_edit_topic()
{
  this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud") {
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
       .project_details(this.user_id)
       .subscribe(
         data => {
           this.information = data.data as string[];
           this.status = data.status as string;
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
