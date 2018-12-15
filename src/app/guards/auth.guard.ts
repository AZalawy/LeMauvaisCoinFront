import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { share } from 'rxjs/operators';

import { AuthFacade } from '../facades/auth.facade';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  canActivate() {
    let currentUserToken = null;
    this.authFacade.currentUserToken$.subscribe(token => currentUserToken = token);

    if (currentUserToken !== null) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
