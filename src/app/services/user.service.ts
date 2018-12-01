import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserEndpoint } from '../endpoints/user.endpoints';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(UserEndpoint.AUTH, {username: username, password: password});
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(UserEndpoint.GET_ALL_USERS);
  }
}
