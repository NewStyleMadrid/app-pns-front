import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoURL = 'http://localhost:8080/producto/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + 'lista');
  }

  public detalle(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detalle/${id}`);
  }

  public detalleNombre(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detallenombre/${nombre}`);
  }

  public guardar(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'crear', producto);
  }

  public actualizar(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `actualizar/${id}`, producto);
  }

  public eliminar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}
