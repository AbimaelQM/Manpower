import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';
import { PersonSkill } from '../models/personSkill';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements ICrudService<Person>{

  public apiUrl: string = environment.apiUrl + '/person/';
  constructor(private http:HttpClient) { }


  getPersonFree(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}searchPeopleFreeJob`)
  }
  getSkillOfPerson(id:number): Observable<PersonSkill[]> {
    return this.http.get<PersonSkill[]>(`${this.apiUrl}searchSkillInIdPerson/${id}`)
  }
  get(termoBusca?: string): Observable<Person[]> {
    if(termoBusca){
      return this.http.get<Person[]>(`${this.apiUrl}search/${termoBusca}`);
    }else{
      return this.http.get<Person[]>(this.apiUrl);
    }
  }
  getAll(page: number, size: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+"page?page="+page+"&size="+size);
  }
  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}${id}`);
  }
  insert(objeto: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, objeto);
  }
  update(objeto: Person): Observable<Person> {
    return this.http.put<Person>(this.apiUrl, objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
