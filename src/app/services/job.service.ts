import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageBarComponent } from '../components/message-bar/message-bar.component';
import { Job } from '../models/job';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class JobService implements ICrudService<Job>{
  public apiUrl: string = environment.apiUrl + '/job/';

  constructor(private http: HttpClient, private message_bar: MatSnackBar) { }
  get(termoBusca?: string): Observable<Job[]> {
    if (termoBusca) {
      return this.http.get<Job[]>(`${this.apiUrl}search/${termoBusca}`);
    } else {
      return this.http.get<Job[]>(this.apiUrl);
    }
  }
  getAll(request:any): Observable<any>{
    return this.http.get<any>(this.apiUrl+"page");
  }


  // getStatics(): Observable<?> {
    
  //   return this.http.get<Job[]>(this.apiUrl);
    
  // }

  getById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}${id}`);
  }
  insert(objeto: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, objeto);
  }
  update(objeto: Job): Observable<Job> {

 
    return this.http.put<Job>(this.apiUrl, objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`)
  }
}
