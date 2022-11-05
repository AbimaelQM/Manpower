import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonSkill } from '../models/personSkill';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class PersonSkillService implements ICrudService<PersonSkill>{

  constructor(private http:HttpClient) { }
  public apiUrl: string = environment.apiUrl + '/personSkill/';
  get(termoBusca?: string | undefined): Observable<PersonSkill[]> {
    if(termoBusca){
      return this.http.get<PersonSkill[]>(`${this.apiUrl}search/${termoBusca}`)
    }else{
      return this.http.get<PersonSkill[]>(this.apiUrl)
    }
  }
  getById(id: number): Observable<PersonSkill> {
    return this.http.get<PersonSkill>(this.apiUrl+id)
  }
  insert(objeto: PersonSkill): Observable<PersonSkill> {
    return this.http.post<PersonSkill>(this.apiUrl,objeto)
  }
  update(objeto: PersonSkill): Observable<PersonSkill> {
    return this.http.put<PersonSkill>(this.apiUrl,objeto)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id)
  }
}
