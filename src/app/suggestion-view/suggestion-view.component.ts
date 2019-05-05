import { Component, OnInit } from '@angular/core';
import { Api, ApiService } from '../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-suggestion-view',
  templateUrl: './suggestion-view.component.html',
  styleUrls: ['./suggestion-view.component.css']
})
export class SuggestionViewComponent implements OnInit {
proj_id :string;
user_id :string;
stud_id :string;
information : string[];
status :number;
role :string;

  constructor(private router: Router,private api_service: ApiService) { }

  ngOnInit() {
     this.role = window.sessionStorage.getItem("role");
    if(this.role != null) {
      this.user_id = window.sessionStorage.getItem("user_id");
      // this.stud_id = window.sessionStorage.getItem("stud_id");
      this.api_service
      .select_suggestion(this.user_id)
      .subscribe(
        data => {
          this.status = data.status as number;
          if(this.status== 1)
          {
            this.information = data.data as string[];
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

  slice_suggestion(suggestion_string : string) {
    return suggestion_string.slice(0, 50) + " ... ";
  }
}
