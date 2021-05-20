import { Home } from './../models/home';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homeURL = environment.homeURL;
  constructor(private http: HttpClient) { }

  public lista(): Observable<Home[]> {
    return this.http.get<Home[]>(this.homeURL + 'lista');
  }

  public listado(): Observable<Home[]> {
    return this.http.get<Home[]>(this.homeURL + 'lista');
  }

  public detalle(id: number): Observable<Home> {
    return this.http.get<Home>(this.homeURL + `detalle/${id}`);
  }

  public actualizar(id: number, home: Home): Observable<any> {
    return this.http.put<any>(this.homeURL + `actualizar/${id}`, home);
  }

  public upload(Home: File): Observable<any> { // File, ya que pasamos un archivo.
    const formData = new FormData();
    formData.append('multipartFile', Home);
    return this.http.post<any>(this.homeURL + 'upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.homeURL + `delete/${id}`);
  }
}
