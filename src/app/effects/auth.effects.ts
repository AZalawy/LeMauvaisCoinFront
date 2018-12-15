import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, switchMap } from 'rxjs/operators';

import { Auth, AuthActions, LoggedIn } from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  public currentauthToken$ = this.actions$.pipe(
    ofType<Auth>(AuthActions.Auth),
    switchMap(action => {
      return this.authService.login(action.username, action.password);
    }),
    filter(user => user !== null),
    map(user => {
      this.router.navigate(['/home']);
      return new LoggedIn(user.token);
    })
  );

  public constructor(private actions$: Actions, private router: Router, private authService: AuthService) { }
}
