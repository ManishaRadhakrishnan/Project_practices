import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-stud-prof',
  templateUrl: './stud-prof.component.html',
  styleUrls: ['./stud-prof.component.css']
})
export class StudProfComponent implements OnInit {

  information : string[];
  status : number;
  
  constructor(private router: Router,private api_service: ApiService) { }

  ngOnInit() {
    this.api_service
     .view_student_profile()
     .subscribe(
       data => {
         this.information = data.data as string[];
         this.status = data.status as number;
           if(this.status == 1)
           {
             this.router.navigate(['/stud-prof']);
           }
       },
       err => {
         console.log(err);
       }
     );
 }

}
