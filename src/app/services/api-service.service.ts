import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiServiceService<T> {

  constructor(private http:HttpClient) { }

  public get(url:string): Observable<T> {
    return this.http.get<T>(url);
  }
}
