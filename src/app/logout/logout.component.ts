import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.sessionStorage.clear();
     this.router.navigate(['/login']);
    //  location.reload();
  }
  

}
