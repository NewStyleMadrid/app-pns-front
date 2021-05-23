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

  public crear(cita: Cita): Observable<any> {
    return this.http.post<any>(this.citaURL + 'nueva', cita, cabecera);
  }

}
