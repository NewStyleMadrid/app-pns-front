import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenURL = 'http://localhost:8080/diseño/';

  constructor(private http: HttpClient) { }

  public lista(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.imagenURL + 'lista');
  }

  // File, ya que pasamos un archivo.
  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.http.post<any>(this.imagenURL + 'upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(this.imagenURL + `delete/${id}`);
  }
}
