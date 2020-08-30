import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  private URL = 'http://localhost:5000/api/user';

  login(loginInfo) {
   return this.httpClient.post(this.URL + `/login`, loginInfo);
  }

  singup(singupInfo) {
    return this.httpClient.post(this.URL + `/singup`, singupInfo);
  }
}
