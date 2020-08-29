import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductsService } from './../Services/Products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}
  public fetchSingleProd;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productID')) {
        const productID = paramMap.get('productID');
        this.productsService.fetchSingleProduct(productID).subscribe((res:any) => {
          console.log(res.product);
          this.fetchSingleProd = res.product;
        });
      }
    });
  }

  discountPrice(orgPrice){
    return (orgPrice - 100)
  }
}
