import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  CurrentUser: any;
  login(user: any) {
    this.CurrentUser = user;
  }

  logout() {
    this.CurrentUser = null;
  }
}
