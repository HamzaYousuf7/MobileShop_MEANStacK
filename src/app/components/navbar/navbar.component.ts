import { ProductsService } from "./../../Services/Products/products.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "./../../Services/User/user.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private userService: UserService,
    private productsService: ProductsService,
    private router: Router
  ) {}
  public isAuthenticated;
  public itemCount: number;
  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated;
    this.userService.getAuthStatusListner().subscribe((isAuthenticated) => {
      console.log("....?", this.userService.isAuthenticated);
      this.isAuthenticated = isAuthenticated;
    });

    //item count
    this.itemCount = 0; //init it will b zeroi
    this.productsService.getUpdatedOrderList().subscribe((tempObj) => {
      this.itemCount = tempObj.orderProducts.length;
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}
