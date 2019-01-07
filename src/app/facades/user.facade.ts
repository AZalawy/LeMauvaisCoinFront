import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Register, Unregister } from '../actions/user.actions';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  public constructor(
    private store: Store<any>,
    private userService: UserService
  ) {}

  public register(user: User): void {
    this.store.dispatch(new Register(user));
  }

  public unregister(): void {
    this.store.dispatch(new Unregister());
  }

  public getAllUsers(): Observable<User[]> {
    return this.userService.getAll();
  }
}
