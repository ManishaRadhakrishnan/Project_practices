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
  ngOnInit() {
    this.api_service
     .project_details()
     .subscribe(
       data => {
         console.log(data);
         this.information = data.data as string[];
         this.status = data.status as number;
       },
       err => {
         console.log(err);
       }
     );
  }

  submit_new_topic(){
    this.router.navigate(['/submit-topic']);
  }
}
