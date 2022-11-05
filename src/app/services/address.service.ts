import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { ICrudService } from './icrud-service';

@Injectable({
  providedIn: 'root'
})
export class AddressService implements ICrudService<Address>{

  public apiUrl: string = environment.apiUrl + '/address/';
  constructor(private http:HttpClient) { }
  get(termoBusca?: string): Observable<Address[]> {
    if(termoBusca){
      return this.http.get<Address[]>(`${this.apiUrl}search/${termoBusca}`);
    }else{
      return this.http.get<Address[]>(this.apiUrl);
    }
  }
  getById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}${id}`); 
  }
  insert(objeto: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, objeto);
  }
  update(objeto: Address): Observable<Address> {
    return this.http.put<Address>(this.apiUrl, objeto);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
