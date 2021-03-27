import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = 'http://localhost:8080/usuario/';

  constructor(private http: HttpClient) { }

  /***** METODOS BACK-END *****/

  // Listado de usuarios
  /*
  public lista(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL + 'lista');
  }

  public detalle(id: number): Observable<User> {
    return this.http.get<User>(this.userURL + `detalle/${id}`);
  }

  // Registro de usuarios
  public registrar(user: User): Observable<any> {
    return this.http.post<any>(this.userURL + 'registrar', user);
  }

  // Actualizar usuarios
  public actualizar(id: number, user: User): Observable<any> {
    return this.http.put<any>(this.userURL + `actualizar/${id}`, user);
  }

  // Eliminar usuarios
  public eliminar(id:number): Observable<any>{
    return this.http.delete<any>(this.userURL + `eliminar/${id}`);
  }
  */
}
