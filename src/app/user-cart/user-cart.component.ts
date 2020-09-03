import { UserService } from './../Services/User/user.service';
import { ProductsService } from './../Services/Products/products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private router: Router
  ) {}
  public cartProduct;
  public totalPrice;
  public isAuthen;
  public isLoading = false;
  public responseMessage = '';
  public isModalOpen = false;

  ngOnInit() {
    // by defult values
    this.cartProduct = this.productsService.orderProducts;
    this.totalPrice = this.productsService.totalPrice;
    this.isAuthen = this.userService.isAuthenticated;

    this.productsService.getUpdatedOrderList().subscribe((temp) => {
      this.cartProduct = temp.orderProducts;
      this.totalPrice = temp.totalPrice;

    });

    // subscribing to the subject
    this.userService.getAuthStatusListner().subscribe((isAuthenticated) => {
      this.isAuthen = isAuthenticated;
    });
  }

  placeOrder() {
    this.isLoading = true;
    this.productsService.placeYourOrder().subscribe((res: any) => {
      this.isLoading = false;
      this.isModalOpen = true;
      this.responseMessage = res.message;
      this.productsService.cleartCartData();
    });
  }

  closeModal() {
    this.isModalOpen = false;
    // only run if we successfully login in
    if (!this.userService.isError) {
      this.router.navigate(['/']);
    }
  }
}
