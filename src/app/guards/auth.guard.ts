import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserFacade } from '../facades/user.facade';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userFacade: UserFacade) {}

  canActivate() {
    let currentUser: User = null;
    this.userFacade.currentUser$.subscribe(user => currentUser = user);

    if (currentUser && currentUser.id) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
