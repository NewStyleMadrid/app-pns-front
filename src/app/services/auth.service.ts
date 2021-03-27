import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { RegistroUsuario} from '../models/registro-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL='http://localhost:8080/auth/';

  constructor( private http: HttpClient) { }


  // Registro de usuario
  public registrar(newUser: RegistroUsuario ){
    return this.http.post<any>(this.authURL + 'registrar', newUser);
  }

  //Login usuario
  public login(loginUser: LoginUsuario ){
    return this.http.post<JwtDto>(this.authURL + 'login', loginUser);
  }

}
