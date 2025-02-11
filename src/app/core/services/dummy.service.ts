import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  private dummyUrl = 'http://localhost:8080/dummy';

  constructor(
    private http: HttpClient,
  ) { }

  getTime() : Observable<string> {
    return this.http.get<string>(this.dummyUrl);
  }
}
