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
export class AreaService implements ICrudService<Area>{

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl: string = environment.apiUrl + '/area/';

  public get(termo?: string): Observable<Area[]> {

    let url = this.apiUrl;

    if (termo) {
      url += 'search/' + termo;
    }
    return this.http.get<Area[]>(url).pipe(

      res => res,
      error => error
    )
  }

  getById(id: number): Observable<Area> {
    
    return this.http.get<Area>(this.apiUrl + id).pipe(

      res=>res,
      error=>error
    )
  }
  

  insert(objeto: Area): Observable<Area> {

    return this.http.post<Area>(this.apiUrl, objeto).pipe(

      res => res,
      error => error
    )
  }

  public update(registro: Area): Observable<Area> {

    return this.http.put<Area>(this.apiUrl, registro).pipe(
      res => res,
      error => error
    )
  }

  public delete(id: number): Observable<void> {

    return this.http.delete<void>(this.apiUrl + id).pipe(

      res => res,
      error => error
    )
  }


}
