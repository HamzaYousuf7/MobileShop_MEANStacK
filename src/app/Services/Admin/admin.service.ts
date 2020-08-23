import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private URL = 'http://localhost:5000';
  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get(this.URL + '/api/product?isHomePage=true');
  }
  addNewProduct(newProduct) {
    //converting data to FORM DATA
    const formData = new FormData();

    // tslint:disable-next-line: forin
    for (const key in newProduct) {
      //! TESTING KIA AESE DATA GET KAR SAKTE HE (YES)
      // console.log(key);
      // console.log(newProduct[key]);

      if (key === 'additionalImages') {
        // !append multilple time
        for (let singleImg of newProduct.additionalImages) {
          formData.append('additionalImages', singleImg);
        }
      } else {
        formData.append(key, newProduct[key]);
      }
    }
    return this.httpClient.post(this.URL + '/api/product', formData);
  }

  deleteProduct(productID) {
    return this.httpClient.delete(this.URL + `/api/product/${productID}`);
  }
}
