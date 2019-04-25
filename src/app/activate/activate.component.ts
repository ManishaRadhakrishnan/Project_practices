import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  error: string;
  api: Api;
  information : string[];
  constructor(private api_service: ApiService) { }

  ngOnInit() {
    this.api_service
     .list_all_students()
     .subscribe(
       data => {
         this.information = data.data as string[];
       },
       err => {
         console.log(err);
       }
     );
 }

}
