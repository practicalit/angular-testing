import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxServiceService {

  rxSubjectProperty$: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  getShow() {
    return true;
  }

  getSampleText() {
    return "sample";
  }

  getData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  callNextOnSubject(data: any) {
    this.rxSubjectProperty$.next(data);
  }
}
