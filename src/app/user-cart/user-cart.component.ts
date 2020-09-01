import { UserService } from "./../Services/User/user.service";
import { ProductsService } from "./../Services/Products/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-cart",
  templateUrl: "./user-cart.component.html",
  styleUrls: ["./user-cart.component.css"],
})
export class UserCartComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private userService: UserService
  ) {}
  public cartProduct;
  public totalPrice;
  public isAuthen;
  ngOnInit() {
    // by defult values
    this.cartProduct = this.productsService.orderProducts;
    this.totalPrice = this.productsService.totalPrice;
    this.isAuthen =  this.userService.isAuthenticated;

    this.productsService.getUpdatedOrderList().subscribe((temp) => {
      console.log("what are we getting in the cart arr", temp);
      this.cartProduct = temp.orderProducts;
      this.totalPrice = temp.totalPrice;
      console.log(this.totalPrice);
    });

    //subscribing to the subject
    this.userService.getAuthStatusListner().subscribe((isAuthenticated) => {
      this.isAuthen = isAuthenticated;
    });
  }

  placeOrder() {
    this.productsService.placeYourOrder().subscribe((res) => {
      console.log("what is the response of cat place", res);
    });
  }
}
