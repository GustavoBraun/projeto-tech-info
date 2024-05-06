import { Injectable } from '@angular/core';
import { Veiculo } from '../Veiculo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private apiURL = 'http://localhost:8080/veiculo'

  constructor(private http: HttpClient) { }
  
  getAll():Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiURL);
  }

  remove(id: number) {
    return this.http.delete<Veiculo>(`${this.apiURL}/${id}`);
  }

  post(veiculo: Object) {
    return this.http.post<Veiculo>(this.apiURL, veiculo);
  }

}
