import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})
export class TopicViewComponent implements OnInit {

  constructor(private api_service: ApiService) { }
  information : string[];
  ngOnInit() {
    this.api_service
     .project_details()
     .subscribe(
       data => {
         console.log(data);
         this.information = data.data as string[];
       },
       err => {
         console.log(err);
       }
     );
  }

}
