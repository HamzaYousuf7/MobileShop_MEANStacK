import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private token;
  public responseMessage = "";
  public isError = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {}
  private URL = "http://localhost:5000/api/user";

  login(loginInfo) {
    this.httpClient.post(this.URL + `/login`, loginInfo).subscribe(
      (res: any) => {
        this.token = res.token;
        this.isError = false;
        this.responseMessage = res.message;
        this.authStatusListener.next(true);
      },
      (error) => {
        console.log("error occur when try tp login", error.error.message);
        this.isError = true;
        this.responseMessage = error.error.message;
        this.authStatusListener.next(false);
      }
    );
  }

  singup(singupInfo) {
    this.httpClient
      .post(this.URL + `/singup`, singupInfo)
      .subscribe((res: any) => {
        this.token = res.token;
        this.responseMessage = res.message;
        this.authStatusListener.next(true);
        this.isError = false;
      },(error) => {
        console.log("error occur when try tp login", error.error.message);
        this.isError = true;
        this.responseMessage = error.error.message;
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.responseMessage = "";
    this.authStatusListener.next(false);
  }

  getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }
}
