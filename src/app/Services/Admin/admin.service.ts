import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  private URL = 'http://localhost:5000';
  public isAdminAuth = false;
  private token = null;
  public responseMessage;
  public isError = false;
  public errorMessage = '';
  private isAuthSubject = new Subject();

  getAllProducts() {
    return this.httpClient.get(this.URL + '/api/product?isAdmin=true');
  }
  addNewProduct(newProduct) {
    // converting data to FORM DATA
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

  getSingleProduct(productID) {
    return this.httpClient.get(this.URL + `/api/product/${productID}`);
  }

  updateProduct(product, productID) {
    // ! first condtion both images fields are not updated and we have string for them
    if (
      typeof product.mainImg !== 'object' &&
      typeof product.additionalImages[0] !== 'object'
    ) {
      console.log('true both are not object');
      return this.httpClient.put(
        this.URL + `/api/product/${productID}`,
        product
      );
    } else {
      // converting data to FORM DATA
      const formData = new FormData();

      // tslint:disable-next-line: forin
      for (const key in product) {
        //! TESTING KIA AESE DATA GET KAR SAKTE HE (YES)
        // console.log(key);
        // console.log(newProduct[key]);

        if (key === 'additionalImages') {
          // !append multilple time
          for (let singleImg of product.additionalImages) {
            formData.append('additionalImages', singleImg);
          }
        } else {
          formData.append(key, product[key]);
        }
      }

      return this.httpClient.put(
        this.URL + `/api/product/${productID}`,
        formData
      );
    }
  }

  getToken() {
    return this.token;
  }

  getUpdateIsAuth() {
    return this.isAuthSubject.asObservable();
  }

  loginAdmin(adminData) {
    this.httpClient
      .post(`http://localhost:5000/api/admin/login`, adminData)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.responseMessage = res.message;
          this.token = res.token;
          this.isAdminAuth = true;
          this.isError = false;
          this.isAuthSubject.next(true);
        },
        (error) => {
          console.log('error occur when admin login', error);
          this.errorMessage = error.error.message;
          this.isError = true;
          this.isAuthSubject.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAdminAuth = false;
    this.isAuthSubject.next(false);
  }
}
