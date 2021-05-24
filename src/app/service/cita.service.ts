import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cita } from '../models/cita';

const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  citaURL = environment.citaURL;

  constructor(private http: HttpClient) { }

  
  public lista(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.citaURL + 'lista', cabecera);
  }
  
  public detalle(id: number): Observable<Cita> {
    return this.http.get<Cita>(this.citaURL + `detalle/${id}`, cabecera);
  }

  public crear(cita: Cita): Observable<any> {
    return this.http.post<any>(this.citaURL + 'nueva', cita, cabecera);
  }

  public actualizar(id: number, cita: Cita): Observable<any> {
    return this.http.put<any>(this.citaURL + `actualizar/${id}`, cita);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete<any>(this.citaURL + `borrar/${id}`);
  }
}
