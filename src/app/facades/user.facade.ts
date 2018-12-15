import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Register, Unregister } from '../actions/user.actions';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  public constructor(private store: Store<any>) {}

  public register(user: User): void {
    this.store.dispatch(new Register(user));
  }

  public unregister(): void {
    this.store.dispatch(new Unregister());
  }
}
