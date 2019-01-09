import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { dematerialize, materialize, mergeMap } from 'rxjs/operators';

import { OfferEndpoint } from '../endpoints/offer.endpoint';
import { UserEndpoint } from '../endpoints/user.endpoints';
import { Offer } from '../models/offer';
import { User } from '../models/user';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: User[] = [
      { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User', email: 'User1@plop.fr' },
      { id: 2, username: 'test2', password: 'test2', firstName: 'Test2', lastName: 'User2', email: 'User2@plop.fr' },
      { id: 3, username: 'test3', password: 'test3', firstName: 'Test3', lastName: 'User3', email: 'User3@plop.fr' },
      { id: 4, username: 'test4', password: 'test4', firstName: 'Test4', lastName: 'User4', email: 'User4@plop.fr' },
      { id: 5, username: 'test5', password: 'test5', firstName: 'Test5', lastName: 'User5', email: 'User5@plop.fr' },
    ];

    const offers: Offer[] = [
      { id: 1, categories: 'pokémon', title: 'Pikachu', price: 14, description: 'Un pikachu sauvage apparaît' },
      { id: 2, categories: 'décoration', title: 'Plante verte', price: 500, description: 'Un bonzaï de 450 ans' },
      { id: 3, categories: ['informatique', 'jeu vidéo'], title: 'Call of Star Fifa (Deluxe)', price: 1, description: 'G plu 12 an' },
      { id: 4, categories: 'extérieur', title: 'Jacuzzi portable', price: 873, description: 'Voilà voilà' },
      { id: 5, categories: ['sport', 'loisir'], title: 'Surfboard', price: 781, description: 'Une planche de surf' },
    ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // authenticate - public
      if (request.url.endsWith(UserEndpoint.AUTH) && request.method === 'POST') {
        const user = users.find(x => x.username === request.body.id && x.password === request.body.password);
        if (!user) {
          console.warn('Username or password is incorrect');
          return ok(null);
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

      // get all users
      if (request.url.endsWith(UserEndpoint.GET_ALL_USERS) && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }

        return ok(users);
      }

      // get all offers
      if (request.url.endsWith(OfferEndpoint.GET_ALL_OFFERS) && request.method === 'GET') {
        if (!isLoggedIn) {
          return unauthorised();
        }

        return ok(offers);
      }

      // add offer
      if (request.url.endsWith(OfferEndpoint.ADD) && request.method === 'POST') {
        if (!isLoggedIn) {
          return unauthorised();
        }

        const len = offers.length + 1;
        const offer = request.body.offer as Offer;

        offers.push({
          id: len,
          categories: offer.categories,
          title: offer.title,
          price: offer.price,
          description: offer.description,
        });

        return ok({ added: true });
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
