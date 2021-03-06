import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token;
  public responseMessage = '';
  public userID;
  public isError = false;
  private tokenTimer;
  public isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private URL = 'http://localhost:5000/api/user';

  constructor(private httpClient: HttpClient) {}

  login(loginInfo) {
    this.httpClient.post(this.URL + `/login`, loginInfo).subscribe(
      (res: any) => {
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.token = res.token;
        this.userID = res.userID;
        this.isError = false;
        this.responseMessage = res.message;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        this.saveAuthData(res.token, expirationDate, this.userID);
      },
      (error) => {
        this.isError = true;
        this.responseMessage = error.error.message;
        this.authStatusListener.next(false);
      }
    );
  }

  singup(singupInfo) {
    this.httpClient.post(this.URL + `/singup`, singupInfo).subscribe(
      (res: any) => {
        this.token = res.token;
        this.responseMessage = res.message;
        this.userID = res.userID;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.isError = false;
        // local storage and time calculation for login validitiy
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration);

        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        this.saveAuthData(res.token, expirationDate, this.userID);
      },
      (error) => {
        this.isError = true;
        this.responseMessage = error.error.message;
        this.authStatusListener.next(false);
      }
    );
  }

  private saveAuthData(token, expirationDate: Date, userID) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userID', userID);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
  }

  logout() {
    this.token = null;
    this.userID = null;
    this.isAuthenticated = false;
    this.responseMessage = '';
    clearTimeout(this.tokenTimer);
    this.authStatusListener.next(false);
    this.clearAuthData(); // cleaing local storage
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    const expidationDateLocal = localStorage.getItem('expiration');

    if (!token || !expidationDateLocal || !userID) {
      return;
    } // if any of these does not exist

    return {
      token,
      expirationDate: new Date(expidationDateLocal),
      userID,
    };
  }

  public autoLogin() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userID = authInformation.userID;
      this.authStatusListener.next(true);
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  getAuthStatusListner() {
    return this.authStatusListener.asObservable();
  }
}
