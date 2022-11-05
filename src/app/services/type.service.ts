import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Type } from '../models/type';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class TypeService implements ICrudService<Type>{

  constructor(private http:HttpClient) { }
  public apiUrl: string = environment.apiUrl + '/type/';
  get(termoBusca?: string): Observable<Type[]> {
    if(termoBusca){
      return this.http.get<Type[]>(`${this.apiUrl}search/${termoBusca}`)
    }else{
      return this.http.get<Type[]>(this.apiUrl)
    }

  }
  getById(id: number): Observable<Type> {
    return this.http.get<Type>(this.apiUrl+id)
  }
  insert(objeto: Type): Observable<Type> {
    return this.http.post<Type>(this.apiUrl,objeto)
  }
  update(objeto: Type): Observable<Type> {
    return this.http.put<Type>(this.apiUrl,objeto)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id)
  }
}
