import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenURL = environment.imagenURL;

  constructor(private http: HttpClient) { }

  public lista(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.imagenURL + 'lista');
  }

  public listado(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.imagenURL + 'lista');
  }
   
  public detalle(id: number): Observable<Imagen> {
    return this.http.get<Imagen>(this.imagenURL + `detalle/${id}`);
  }

  public actualizar(id: number, imagen: Imagen): Observable<any> {
    return this.http.put<any>(this.imagenURL + `actualizar/${id}`, imagen);
  }

  public upload(imagen: File): Observable<any> { // File, ya que pasamos un archivo.
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.http.post<any>(this.imagenURL + 'upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.imagenURL + `delete/${id}`);
  }
}
