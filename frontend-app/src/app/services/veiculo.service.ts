import { Injectable } from '@angular/core';
import { Veiculo } from '../veiculo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private apiURL = `${environment.api}/veiculo`
  
  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get<Veiculo[]>(this.apiURL);
  }

  remove(id: number) {
    return this.http.delete<Veiculo>(`${this.apiURL}/${id}`);
  }

  post(veiculo: Object) {
    return this.http.post<Veiculo>(this.apiURL, veiculo);
  }

  put(veiculo: Object, id: number) {
    return this.http.put<Veiculo>(`${this.apiURL}/${id}`, veiculo)
  }

}
