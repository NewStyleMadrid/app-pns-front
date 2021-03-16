import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { RegisterUsuario } from '../models/register-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL='http://localhost:8080/auth/';

  constructor( private http: HttpClient) { }


  // Registro de usuario
  public register(newUser: RegisterUsuario ){
    return this.http.post<any>(this.authURL + 'register', newUser);
  }

  //Login usuario
  public login(loginUser: LoginUsuario ){
    return this.http.post<JwtDto>(this.authURL + 'login', loginUser);
  }

}
