import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserEndpoint } from '../endpoints/user.endpoints';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  public register(user: User): Observable<{registered: Boolean, token: string}> {
    return this.http.post<{registered: Boolean, token: string}>(UserEndpoint.REGISTER, { user: user });
  }

  public unregister(token: string): Observable<Boolean> {
    return this.http.delete<Boolean>(UserEndpoint.UNREGISTER, { params: { userToken: token } });
  }
}
