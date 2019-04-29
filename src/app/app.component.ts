import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'pms-app';

  role : string;
  ngOnInit() {
    this.role = window.sessionStorage.getItem("role");
  }
}
