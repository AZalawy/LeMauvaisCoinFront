import { Injectable } from '@angular/core';
import { createFeatureSelector, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Auth, Logout } from '../actions/auth.actions';
import { AuthState } from '../reducers/auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  public stateSelector = createFeatureSelector<AuthState>('auth');

  public currentUserToken$ = this.store.select(this.stateSelector).pipe(map(state => state.currentUserToken));

  public constructor(private store: Store<AuthState>) { }

  public login(username: string, password: string): void {
    this.store.dispatch(new Auth(username, password));
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
