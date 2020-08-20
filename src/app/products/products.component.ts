import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  constructor() {}
  public pageSize = 5;
  public currentPage = 1;
  public maxProductsCount = 20;

  ngOnInit() {}

  paginationHandler(page) {
    this.currentPage = page;
    console.log(page);
    /* TODO
    this.isLoading = true;
    this.getAllProducts(); */
  }
}
