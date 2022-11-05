import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teams } from '../models/team';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class TeamService implements ICrudService<Teams>{

  public apiUrl: string = environment.apiUrl + '/team/';
  constructor(private http:HttpClient) { }
  
  get(termoBusca?: string): Observable<Teams[]> {
    if (termoBusca) {
      return this.http.get<Teams[]>(`${this.apiUrl}search/${termoBusca}`);
    } else {

      
      return this.http.get<Teams[]>(this.apiUrl);
      
    }
  }

  getById(id: number): Observable<Teams> {
    return this.http.get<Teams>(`${this.apiUrl}${id}`);
  }

  insert(objeto: Teams): Observable<Teams> {
    return this.http.post<Teams>(this.apiUrl, objeto);
  }
  update(objeto: Teams): Observable<Teams> {
    return this.http.put<Teams>(this.apiUrl, objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
