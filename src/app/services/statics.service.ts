import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataStatics } from '../models/data-statics';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl: string = environment.apiUrl + '/statics/';

  get(entity?:string):Observable<DataStatics> {

    if(!entity){

      entity = 'job';
    }

    return this.http.get<DataStatics>(this.apiUrl+entity);

  }

}
