import { Action } from '@ngrx/store';

import { User } from '../models/user';

export enum UserActions {
  Auth = '[User] Authenticate',
  LoggedIn = '[User] Logged in',
  Logout = '[User] Logout',
  LoadAllUsers = '[User] Load all',
  AllUsersLoaded = '[User] All users loaded',
}

export class UserAuth implements Action {
  public readonly type = UserActions.Auth;

  public constructor(public readonly username: string, public readonly password: string) {}
}

export class UserLoggedIn implements Action {
  public readonly type = UserActions.LoggedIn;

  public constructor(public readonly user: User) {}
}

export class UserLogout implements Action {
  public readonly type = UserActions.Logout;
}

export class LoadAllUsers implements Action {
  public readonly type = UserActions.LoadAllUsers;
}

export class AllUsersLoaded implements Action {
  public readonly type = UserActions.AllUsersLoaded;

  public constructor(public readonly users: User[]) {}
}

export type UserActionsTypes = UserAuth | UserLoggedIn | UserLogout | LoadAllUsers | AllUsersLoaded;
