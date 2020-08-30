import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../Services/User/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  public isAuthenticated;
  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated
    this.userService.getAuthStatusListner().subscribe((isAuthenticated) => {
      console.log("....?",this.userService.isAuthenticated)
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
