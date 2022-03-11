import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url: string = "https://jsonplaceholder.typicode.com/todos"
  constructor(private http: HttpClient) {

  }

  /**
   * Returns all todo items for app
   * @returns Observable of type any
   */
  getData(): Observable<any> {
    return this.http.get(this.url);
  }

  postData( data: Todo ): Observable<any> {
    return this.http.post(this.url, data);
  }
}
