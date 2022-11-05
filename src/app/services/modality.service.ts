import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modality } from '../models/modality';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class ModalityService implements ICrudService<Modality>{

  constructor(private http:HttpClient) { }
  public apiUrl: string = environment.apiUrl + '/modality/';
  get(termoBusca?: string): Observable<Modality[]> {
    if(termoBusca){
      return this.http.get<Modality[]>(`${this.apiUrl}search/${termoBusca}`)
    }else{
      return this.http.get<Modality[]>(this.apiUrl)
    }

  }
  getById(id: number): Observable<Modality> {
    return this.http.get<Modality>(this.apiUrl+id)
  }
  insert(objeto: Modality): Observable<Modality> {
    return this.http.post<Modality>(this.apiUrl,objeto)
  }
  update(objeto: Modality): Observable<Modality> {
    return this.http.put<Modality>(this.apiUrl,objeto)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id)
  }
}
