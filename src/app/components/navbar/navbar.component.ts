import { UserService } from "./../../Services/User/user.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private userService: UserService) {}
  public isAuthenticated;
  ngOnInit() {
    this.userService.getAuthStatusListner().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout(){
    this.userService.logout()
  }
}
