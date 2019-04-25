import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';

@Component({
  selector: 'app-stud-prof',
  templateUrl: './stud-prof.component.html',
  styleUrls: ['./stud-prof.component.css']
})
export class StudProfComponent implements OnInit {

  information : string[];

  constructor(private api_service: ApiService) { }

  ngOnInit() {
    this.api_service
     .view_student_profile()
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
