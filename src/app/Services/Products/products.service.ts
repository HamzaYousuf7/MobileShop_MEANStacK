import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  private URL = "http://localhost:5000/api/product";

  fetchHomeCompProduct() {
    return this.httpClient.get(this.URL + "?isHomePage=true");
  }

  fetchSingleProduct(productID) {
    return this.httpClient.get(this.URL + `/${productID}`);
  }

  fetchAllProducts(pageSize, currentPage) {
    return this.httpClient.get(
      this.URL + `?pageSize=${pageSize}&currentPage=${currentPage}`
    );
  }
}
