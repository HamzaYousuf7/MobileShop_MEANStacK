import { UserService } from "./../User/user.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}
  private URL = "http://localhost:5000/api/product";
  public orderProducts = [];
  public totalPrice = 0;

  private userCartSubject = new Subject<{
    orderProducts: any[];
    totalPrice: number;
  }>();

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

  public getUpdatedOrderList() {
    return this.userCartSubject.asObservable();
  }

  // cart function start

  addProductInCart(product) {
    // TODO sernario no 1 product not added senario no 2 product already added
    // checking if we already have this product
    const isExist = this.orderProducts.find((p) => p._id === product._id);
    console.log("is exist", isExist);
    if (isExist) {
      // if that product does exist
      const tempArr = [...this.orderProducts];
      const tempIndex = this.orderProducts.findIndex(
        (p) => p._id === product._id
      );
      const tempObj = tempArr[tempIndex];
      tempObj.quantity += 1; // updating the value
      tempArr[tempIndex] = tempObj; // updating the tempp arr
      this.orderProducts = tempArr; // updating the org arr
    } else {
      this.orderProducts.push(product);
    }
    // adding price to total price
    this.totalPrice = this.totalPrice + (product.price - 100); // because this is the discount price
    console.log(
      "final result what is inside the order array",
      this.orderProducts,
      this.totalPrice
    );
    this.userCartSubject.next({
      orderProducts: this.orderProducts,
      totalPrice: this.totalPrice,
    });
  }

  placeYourOrder() {
    const tempArr = [...this.orderProducts];
    const userID = this.userService.userID;
    // creating this array for replacing _id to product id
    const updateFieldsArr = tempArr.map((singleProd) => {
      return {
        productID: singleProd._id,
        name: singleProd.name,
        brandName: singleProd.brandName,
        price: singleProd.price,
        quantity: singleProd.quantity,
        availableColor: singleProd.availableColor,
      };
    });

    console.log("final obj for cart", {
      userID,
      orderProducts: updateFieldsArr,
      totalPrice: this.totalPrice,
    });

    return this.httpClient.post("http://localhost:5000/api/cart/placeOrder", {
      userID,
      orderProducts: updateFieldsArr,
      totalPrice: this.totalPrice,
    });
  }
}
