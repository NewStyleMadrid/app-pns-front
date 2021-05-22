import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../models/servicio';

const cabecera = { headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  servicioURL = environment.servicioURL;

  constructor(private http: HttpClient) { }

  
  public lista(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.servicioURL + 'lista', cabecera);
  }
  
  public detalle(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(this.servicioURL + `detalle/${id}`, cabecera);
  }

  public crear(servicio: Servicio): Observable<any> {
    return this.http.post<any>(this.servicioURL + 'nuevo', servicio, cabecera);
  }

  public actualizar(id: number, servicio: Servicio): Observable<any> {
    return this.http.put<any>(this.servicioURL + `actualizar/${id}`, servicio);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.servicioURL + `borrar/${id}`);
  }
}