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

  prodURL = environment.productoURL;
  //productosURL = environment.productosURL;

  constructor(private httpClient: HttpClient) { }

  
  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.prodURL + 'lista', cabecera);
  }
  
  public detalle(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.prodURL + `detalle/${id}`, cabecera);
  }

  public crear(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.prodURL + 'nuevo', producto, cabecera);
  }

  public actualizar(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.prodURL + `actualizar/${id}`, producto);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.prodURL + `borrar/${id}`);
  }
 /*
  public productos(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get<any>(this.productosURL + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  */
}
