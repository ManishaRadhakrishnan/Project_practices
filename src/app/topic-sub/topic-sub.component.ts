import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';

@Component({
  selector: 'app-topic-sub',
  templateUrl: './topic-sub.component.html',
  styleUrls: ['./topic-sub.component.css']
})
export class TopicSubComponent implements OnInit {

  error: string;
  api: Api;

  constructor(private api_service: ApiService) { }

  ngOnInit() {
  }

  do_submit_topic(project_title: string, project_domains: string, project_technologies: string, project_description: string)
  {

    let user_id = "1";
    this.api_service.do_add_project_topic(user_id, project_title, project_domains, project_technologies, project_description)
    .subscribe(
      (data: Api) => this.api = { ...data }, // success path
      error => this.error = error // error path
    );
  }

}
