import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';
const USERNAME_KEY = 'authUsername';
const AUTH_KEY = 'authAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUsername(username: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(auth: string[]): void {
    window.sessionStorage.removeItem(AUTH_KEY);
    window.sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(AUTH_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTH_KEY)).foreach(auth => {
        this.roles.push(auth.auth);
      });
    }
    return this.roles;
  }

  public logOut():void{
    window.sessionStorage.clear(); // Limpia todo lo que tenemos en el sesionstorage.
  }

}
