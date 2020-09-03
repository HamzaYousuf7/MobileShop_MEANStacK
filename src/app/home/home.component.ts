import { ProductsService } from './../Services/Products/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  public products;
  public specialProducts;
  public featuredProducts;
  public isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.productsService.fetchHomeCompProduct().subscribe((res: any) => {
      this.isLoading = false;
      this.products = res.products;
      this.specialProducts = this.products.slice(0, 4);
      this.featuredProducts = this.products.slice(4, 8);
    });
  }

  addToCart(productID) {
    const tempProduct = this.products.find((p) => p._id === productID);
    const {
      _id,
      name,
      brandName,
      price,
      mainImg,
      availableColor,
    } = tempProduct; // extracting the property we need from the obj

    // calling the service
    this.productsService.addProductInCart({
      _id,
      name,
      brandName,
      price,
      mainImg,
      availableColor,
      quantity: 1,
    });
  }

  calculateDiscountPrice(orgPrice) {
    return orgPrice - 100;
  }
}
