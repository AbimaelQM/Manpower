import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from '../models/area';
import { Skill } from '../models/skill';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class SkillService implements ICrudService<Skill>{


  constructor(
    private http: HttpClient,
  ) { }


  apiUrl: string = environment.apiUrl + '/skill/';
  apiArea: string = environment.apiUrl + '/area/';

  getSkill(id:number):Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiArea +'searchSkillInIdArea/'+id)
  }

  getById(id: number): Observable<Skill> {
    
    return this.http.get<Skill>(this.apiUrl + id).pipe(

      res=>res,
      error=>error
    )
  }

  public get(termo?: string): Observable<Skill[]> {

    let url = this.apiUrl;

    if (termo) {
      url += 'search/' + termo;
    }
    return this.http.get<Skill[]>(url).pipe(

      res => res,
      error => error
    )
  }

  insert(objeto: Skill): Observable<Skill> {


    return this.http.post<Skill>(this.apiUrl, objeto).pipe(

      res => res,
      error => error,
      comprete => comprete
    )
  }

  update(objeto: Skill): Observable<Skill> {

    return this.http.put<Skill>(this.apiUrl,objeto).pipe(
      res=>res,
      error=>error
    )
  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(this.apiUrl+id).pipe(
      res=>res,
      error=>error
    )
  }

}
