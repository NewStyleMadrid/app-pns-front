import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = 'http://localhost:8080/user/';

  constructor(private http: HttpClient) { }

  /***** METODOS BACK-END *****/

  // Listado de usuarios
  public list(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL + 'list');
  }

  public detail(id: number): Observable<User> {
    return this.http.get<User>(this.userURL + `detail/${id}`);
  }

  // Registro de usuarios
  public saveUser(user: User): Observable<any> {
    return this.http.post<any>(this.userURL + 'register', user);
  }

  // Actualizar usuarios
  public updateUser(id: number, user: User): Observable<any> {
    return this.http.put<any>(this.userURL + `update/${id}`, user);
  }

  // Eliminar usuarios
  public deleteUser(id:number): Observable<any>{
    return this.http.delete<any>(this.userURL + `delete/${id}`);
  }
}
