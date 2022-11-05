import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubTeam } from '../models/subteam';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class SubTeamService implements ICrudService<SubTeam>{

  constructor(private http:HttpClient) { }
  public apiUrl: string = environment.apiUrl + '/subteam/';
  public apiTeam: string = environment.apiUrl + '/team/';

  // Retorna sub times de um time
  getSubTeam(id:number):Observable<SubTeam[]> {
    return this.http.get<SubTeam[]>(this.apiTeam +'searchSubteamInIdTeam/'+id)
  }
  get(termoBusca?: string | undefined): Observable<SubTeam[]> {
    if(termoBusca) {
      return this.http.get<SubTeam[]>(`${this.apiUrl}search/${termoBusca}`);
    }else{
      return this.http.get<SubTeam[]>(this.apiUrl);
    }
  }
  getById(id: number): Observable<SubTeam> {
    return this.http.get<SubTeam>(`${this.apiUrl}id`);
  }
  insert(objeto: SubTeam): Observable<SubTeam> {
    return this.http.post<SubTeam>(this.apiUrl, objeto)
  }
  update(objeto: SubTeam): Observable<SubTeam> {
    return this.http.put<SubTeam>(this.apiUrl, objeto)
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
