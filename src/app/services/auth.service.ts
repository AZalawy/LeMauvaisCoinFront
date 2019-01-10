import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserEndpoint } from '../endpoints/user.endpoints';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(UserEndpoint.AUTH, {id: username, password: password});
    // return of(
    //   {id: 1, username: 'test', password: 'test', firstName: 'Test',
    //    lastName: 'User', email: 'User1@plop.fr', token: 'fake-token-bearer'});
  }
}
