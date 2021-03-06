import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtModel } from '../models/jwt-model';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private http: HttpClient) { }

  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.http.post<JwtModel>(this.authURL + 'login', usuario, cabecera);
  }

  public registrar(usuario: NuevoUsuario): Observable<any> {
    return this.http.post<any>(this.authURL + 'registrar', usuario, cabecera);
  }

  public lista(): Observable<NuevoUsuario[]> {
    return this.http.get<NuevoUsuario[]>(this.authURL + 'lista', cabecera);
  }

  public detallePerfil(userName: string): Observable<NuevoUsuario> {
    return this.http.get<NuevoUsuario>(this.authURL + `detallePerfil/${userName}`, cabecera);
  }

  public detalle(id: number): Observable<NuevoUsuario> {
    return this.http.get<NuevoUsuario>(this.authURL + `detalle/${id}`, cabecera);
  }

  public perfil(userName: string): Observable<NuevoUsuario> {
    return this.http.get<NuevoUsuario>(this.authURL + `perfil/${userName}`, cabecera);
  }

  public actualizar(id: number, usuario: NuevoUsuario): Observable<any> {
    return this.http.put<any>(this.authURL + `actualizar/${id}`, usuario);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.authURL + `borrar/${id}`);
  }

  public refresh(jwt: JwtModel): Observable<JwtModel> {
    return this.http.post<JwtModel>(this.authURL + 'refresh', jwt, cabecera);
  }
}
