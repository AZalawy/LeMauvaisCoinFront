import { Injectable } from '@angular/core';
import { createFeatureSelector, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { UserAuth, UserLogout } from '../actions/user.actions';
import { UserState } from '../reducers/user.reducer';

@Injectable({providedIn: 'root'})
export class UserFacade {
  public stateSelector = createFeatureSelector<UserState>('user');

  public currentUserToken$ = this.store.select(this.stateSelector).pipe(map(state => state.currentUserToken));

  public constructor(private store: Store<UserState>) {}

  public login(username: string, password: string): void {
    this.store.dispatch(new UserAuth(username, password));
  }

  public logout(): void {
    this.store.dispatch(new UserLogout());
  }
}
