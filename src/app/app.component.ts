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
  mail_role : string;
  role : string;
  user_name : string;
  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
    this.user_name = window.sessionStorage.getItem("user_name");
    let current_url = window.location.href.split("/");
    let current_page = current_url[current_url.length - 1];

    if(this.role == null && current_page != "register") {
      this.router.navigate(["/login"]);
    }
  }

  needed_role(mail_role : string){
this.role = window.sessionStorage.getItem("role");
  // console.log(mail_role);
  if(this.role != '') {
     this.router.navigate(["/mail"], { queryParams: { mail_role: mail_role} });
   }
   else {
     this.router.navigate(["/login"]);
   }
}
}
