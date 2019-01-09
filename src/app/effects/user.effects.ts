import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { LoggedIn, Logout } from '../actions/auth.actions';
import { Register, Unregister, UserActions } from '../actions/user.actions';
import { AuthFacade } from '../facades/auth.facade';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  @Effect()
  public registerUser$ = this.actions$.pipe(
    ofType<Register>(UserActions.Register),
    switchMap(action => this.userService.register(action.user)),
    map(({registered, token}) => {
      if (registered) {
        this.router.navigate(['/home']);
        return new LoggedIn(token);
      } else {
        // TODO: alert message -> user already exists ...
        return new Logout();
      }
    })
  );

  @Effect()
  public unregisterUser$ = this.actions$.pipe(
    ofType<Unregister>(UserActions.Unregister),
    withLatestFrom(this.authFacade.currentUserToken$),
    map(([, token]) => {
      this.userService.unregister(token);
      return new Logout();
    })
  );

  public constructor(private actions$: Actions, private router: Router, private userService: UserService, private authFacade: AuthFacade) {}
}
