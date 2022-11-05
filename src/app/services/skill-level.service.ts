import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SkillLevel } from '../models/skillLevel';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class SkillLevelService implements ICrudService<SkillLevel>{

  public apiUrl: string = environment.apiUrl + '/skill_level/';
  constructor(private http:HttpClient) { }

  get(termoBusca?: string): Observable<SkillLevel[]> {
    if(termoBusca){
      return this.http.get<SkillLevel[]>(`${this.apiUrl}search/${termoBusca}`);
    }else{
      return this.http.get<SkillLevel[]>(this.apiUrl);
    }
  }
  getById(id: number): Observable<SkillLevel> {
    return this.http.get<SkillLevel>(`${this.apiUrl}${id}`);
  }
  insert(objeto: SkillLevel): Observable<SkillLevel> {
    return this.http.post<SkillLevel>(this.apiUrl,objeto);
  }
  update(objeto: SkillLevel): Observable<SkillLevel> {
    return this.http.put<SkillLevel>(this.apiUrl,objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
