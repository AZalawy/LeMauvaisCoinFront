import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

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
    map(user => {
      if (user !== null) {
        this.router.navigate(['/home']);
        return new LoggedIn(user.token);
      } else {
        window.location.reload();
        return new LoggedIn(null);
      }
    })
  );

  public constructor(private actions$: Actions, private router: Router, private authService: AuthService) { }
}
