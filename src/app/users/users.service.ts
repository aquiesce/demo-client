import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../model/user';

@Injectable()
export class UsersService {

  private baseUrl = 'http://localhost:8080/simple-rest-service/api';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {

    return this.http.get(this.baseUrl + '/users')
      .do(data => console.log('getUsers:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUserById(userId: number): Observable<IUser> {

    return this.getUsers()
        .map((users: IUser[]) => users.find(p => p.id === userId));

  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
