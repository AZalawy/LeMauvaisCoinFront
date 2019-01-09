import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserEndpoint } from '../endpoints/user.endpoints';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<User> {
    const body = new HttpParams();
    body.set('id', 'maxor.king@gmail.com');
    body.set('password', 'MaxorKing');
    return this.http.post<User>(
      UserEndpoint.AUTH,
      {id: username, password: password},
      // {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
    );
  }
}
