import { Action } from '@ngrx/store';

import { User } from '../models/user';

export enum UserActions {
  Register = '[User] Register',
  Unregister = '[User] Unregister',
}

export class Register implements Action {
  public readonly type = UserActions.Register;

  public constructor(public readonly user: User) {}
}

export class Unregister implements Action {
  public readonly type = UserActions.Unregister;
}

export type UserActionsTypes = Register | Unregister;
