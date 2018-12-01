import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { AllUsersLoaded, LoadAllUsers, UserActions, UserAuth, UserLoggedIn } from '../actions/user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  @Effect()
  public currentUser$ = this.actions$.pipe(
    ofType<UserAuth>(UserActions.Auth),
    switchMap(action => {
      return this.userService.login(action.username, action.password);
    }),
    map(user => {
      this.router.navigate(['/home']);
      return new UserLoggedIn(user);
    })
  );

  @Effect()
  public users$ = this.actions$.pipe(
    ofType<LoadAllUsers>(UserActions.LoadAllUsers),
    switchMap(() => {
      return this.userService.getAllUsers();
    }),
    map(users => new AllUsersLoaded(users))
  );

  public constructor(private actions$: Actions, private router: Router, private userService: UserService) {}
}
