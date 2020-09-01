import { ProductsService } from './../Services/Products/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  public cartProduct;
  public totalPrice;

  ngOnInit() {
    this.cartProduct = this.productsService.orderProducts;
    this.totalPrice = this.productsService.totalPrice;
    this.productsService.getUpdatedOrderList().subscribe((temp) => {
      console.log('what are we getting in the cart arr', temp);
      this.cartProduct = temp.orderProducts;
      this.totalPrice = temp.totalPrice;
      console.log(this.totalPrice);
    });
  }

  placeOrder() {
    //CALL HTTP SERVICE
    alert('TODO');
  }
}
