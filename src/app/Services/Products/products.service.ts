import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {}
  private URL = 'http://localhost:5000/api/product';

  fetchSingleProduct(productID) {
    return this.httpClient.get(this.URL + `/${productID}`);
  }
}
