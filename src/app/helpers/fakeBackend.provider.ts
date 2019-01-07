import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { UserEndpoint } from '../endpoints/user.endpoints';
import { User } from '../models/user';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let users: User[] = [
      { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', email: 'User1@plop.fr' },
      { id: 2, username: 'test2', password: 'test2', firstName: 'Test2', lastName: 'User2', email: 'User2@plop.fr' },
      { id: 3, username: 'test3', password: 'test3', firstName: 'Test3', lastName: 'User3', email: 'User3@plop.fr' },
      { id: 4, username: 'test4', password: 'test4', firstName: 'Test4', lastName: 'User4', email: 'User4@plop.fr' },
      { id: 5, username: 'test5', password: 'test5', firstName: 'Test5', lastName: 'User5', email: 'User5@plop.fr' },
    ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate - public
      if (request.url.endsWith(UserEndpoint.AUTH) && request.method === 'POST') {
        const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
        if (!user) {
          return error('Username or password is incorrect');
        }

        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token',
        });
      }

      if (request.url.endsWith(UserEndpoint.REGISTER) && request.method === 'POST') {
        const len = users.length + 1;
        const user = request.body.user as User;
        let res = false;

        if (!users.find(u => u.username === user.username)) {
          users.push({
            id: len,
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          });

          res = true;
        }

        return ok({ registered: res, token: 'fake-jwt-token' });
      }

      if (request.url.endsWith(UserEndpoint.UNREGISTER) && request.method === 'DELETE') {
        const token = request.body.token;
        let res = false;

        if (users.find(u => u.token === token)) {
          users = users.filter(u => u.token !== token);

          res = true;
        }

        return ok({ registered: res });
      }

      // get all users
      if (request.url.endsWith(UserEndpoint.GET_ALL_USERS) && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }

        return ok(users);
      }

      // pass through any requests not handled above
      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(dematerialize());

    // private helper functions

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
