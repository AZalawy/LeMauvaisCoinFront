import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '../facades/auth.facade';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUserToken = '';
    this.authFacade.currentUserToken$.subscribe(token => currentUserToken = token);

    if (currentUserToken !== '') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`
        }
      });
    }

    return next.handle(request);
  }
}
