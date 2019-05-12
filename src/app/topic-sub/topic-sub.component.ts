import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Observable }         from 'rxjs';
import { ActivatedRoute }     from '@angular/router';
import { map }                from 'rxjs/operators';

@Component({
  selector: 'app-topic-sub',
  templateUrl: './topic-sub.component.html',
  styleUrls: ['./topic-sub.component.css']
})
export class TopicSubComponent implements OnInit {
  count : number;
  error: string;
  // api: Api;
  user_id : string;
  role: string;
  status : number;
  information:string[];
  button :boolean;
  unique:boolean;
  project_id : string;
  number_of_similar_projects : string[];

  constructor(private router: Router, private route: ActivatedRoute, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role != 'stud') {
      this.router.navigate(["/login"]);
    }
    else {
      this.project_id = this.route.snapshot.paramMap.get("project_id");
      this.route.queryParamMap.subscribe(queryParams => {
        this.project_id = queryParams.get("project_id");
      });
      if(this.project_id != null) {

        this.button = true;
        this.role = window.sessionStorage.getItem("role");
        if(this.role == "stud") {
          this.user_id = window.sessionStorage.getItem("user_id");
          this.api_service
           .single_project_details(this.project_id)
           .subscribe(
             data => {
               this.information = data.data as string[];
               this.status = data.status as number;
               console.log(data);
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
  }

  do_submit_topic(project_title: string, project_domains: string, project_technologies: string, project_description: string, _continue: string) {
    this.user_id = window.sessionStorage.getItem("user_id");
    this.api_service
     .do_add_project_topic(this.user_id, project_title, project_domains, project_technologies, project_description, _continue)
     .subscribe(
       data => {
         console.log(data);
         this.status = data.status as number;
         this.number_of_similar_projects = data.number_of_similar_projects as string[];
         this.unique = data.unique;

         console.log(this.number_of_similar_projects);
         if(this.status == 1 && this.unique == true )
           {
              this.router.navigate(['/topic-view']);
           }
       },
       err => {
         console.log(err);
       }
     );
  }

  do_edit_topic() {

  }

  do_topic_save(project_title : string, project_domains : string, project_technologies : string, project_description : string) {
  this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud") {
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
       .project_details_update(this.user_id,project_title, project_domains, project_technologies, project_description)
       .subscribe(
         data => {
           this.information = data.data as string[];
           this.status = data.status as number;

           if(this.status == 1) {
             this.router.navigate(["/topic-view"]);
           }
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
