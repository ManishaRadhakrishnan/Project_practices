import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit {

  constructor(private router: Router,private api_service: ApiService) { }
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
     else {
       this.router.navigate(["/login"]);
     }
   }
   
    edit(val)
    {
  // this.button=true;
  this.role = window.sessionStorage.getItem("role");
    if(this.role == "stud") {
       this.router.navigate(["/submit-topic"+val]);
     }
     else {
       this.router.navigate(["/login"]);
     }
    }

  submit_new_topic(){
    this.router.navigate(['/submit-topic']);
  }
}
