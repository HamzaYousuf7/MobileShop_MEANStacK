import { ProductsService } from './../Services/Products/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  public pageSize = 9;
  public currentPage = 1;
  public maxProductsCount = 20;
  public allProducts;
  public secOne;
  public secTwo;
  public secThree;
  public isLoading = false;

  ngOnInit() {
    // init fetching all product
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;
    this.productsService
      .fetchAllProducts(this.pageSize, this.currentPage)
      .subscribe((res: any) => {
        this.isLoading = false;
        console.log('[product comp me res kia a rha he]', res);
        this.allProducts = res.products;
        this.maxProductsCount = res.maxProductCount;
        this.secOne = this.allProducts.slice(0, 3);
        this.secTwo = this.allProducts.slice(3, 6);
        this.secThree = this.allProducts.slice(6, 9);
      });
  }
  paginationHandler(page) {
    this.currentPage = page;
    console.log(page);
    this.getAllProducts();
  }

  addToCart(productID) {
    const tempProduct = this.allProducts.find((p) => p._id === productID);
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
