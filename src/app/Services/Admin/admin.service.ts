import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class AdminService {
  private URL = "";
  constructor(private httpClient: HttpClient) {}

  addNewProduct(newProduct) {
    //converting data to FORM DATA
    const formData = new FormData();

    for (let key in newProduct) {
      //!TESTING KIA AESE DATA GET KAR SAKTE HE (YES)
      /* console.log(key);
    console.log(newProduct[key]); */
      formData.append(key, newProduct[key]);
    }

    return this.httpClient.post(this.URL, formData);
  }
}
