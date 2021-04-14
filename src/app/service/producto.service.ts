import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

const cabecera = { headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoURL = environment.productoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + 'lista', cabecera);
  }

  public detalle(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detalle/${id}`, cabecera);
  }

  public crear(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'nuevo', producto, cabecera);
  }

  public editar(producto: Producto, id: number): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `actualizar/${id}`, producto, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `borrar/${id}`, cabecera);
  }
}
