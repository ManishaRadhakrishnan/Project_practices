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

  error: string;
  api: Api;
  user_id : string;
  role: string;
  status : string;
  information:string[];
  button :boolean;

  project_id : Observable<string>;;
  constructor(private router: Router, private route: ActivatedRoute, private api_service: ApiService) { }

  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    if(this.role != 'stud') {
      this.router.navigate(["/login"]);
    }
    else {
      this.project_id = this.route
                       .queryParamMap
                       .pipe(map(params => params.get('project_id') || 'None'));
     console.log(this.project_id);
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
         if(this.status == "1")
           {
              this.router.navigate(['/topic-view']);
           }
       },
       err => {
         console.log(err);
       }
     );
  }

//   do_edit_topic()
// {
//   this.button=true;
//   this.role = window.sessionStorage.getItem("role");
//     if(this.role == "stud") {
//       this.user_id = window.sessionStorage.getItem("user_id");
//       this.api_service
//        .project_details(this.user_id)
//        .subscribe(
//          data => {
//            this.information = data.data as string[];
//            this.status = data.status as string;
//          },
//          err => {
//            console.log(err);
//          }
//        );
//      }
//      else {
//        this.router.navigate(["/login"]);
//      }
// }

do_topic_save()
{
  this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud") {
      this.user_id = window.sessionStorage.getItem("user_id");
      this.api_service
       .project_details_update(this.user_id)
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
