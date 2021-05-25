import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Corte } from '../models/corte';

@Injectable({
  providedIn: 'root'
})
export class CorteService {

  corteURL = environment.imagenURL;

  constructor(private http: HttpClient) { }

  public lista(): Observable<Corte[]> {
    return this.http.get<Corte[]>(this.corteURL + 'lista');
  }

  public listado(): Observable<Corte[]> {
    return this.http.get<Corte[]>(this.corteURL + 'lista');
  }
   
  public detalle(id: number): Observable<Corte> {
    return this.http.get<Corte>(this.corteURL + `detalle/${id}`);
  }

  public actualizar(id: number, Corte: Corte): Observable<any> {
    return this.http.put<any>(this.corteURL + `actualizar/${id}`, Corte);
  }

  public upload(corte: File): Observable<any> { // File, ya que pasamos un archivo.
    const formData = new FormData();
    formData.append('multipartFile', corte);
    return this.http.post<any>(this.corteURL + 'upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.corteURL + `delete/${id}`);
  }
}
