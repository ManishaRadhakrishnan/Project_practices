import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'pms-app';
constructor(private router: Router) { }

  role : string;
  user_name : string;
  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    this.user_name = window.sessionStorage.getItem("user_name");
    if(this.role == null) {
      this.router.navigate(["/login"]);
    }
  }
}
