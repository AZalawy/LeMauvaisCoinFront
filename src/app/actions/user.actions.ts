import { Action } from '@ngrx/store';

export enum UserActions {
  Auth = '[User] Authenticate',
  LoggedIn = '[User] Logged in',
  Logout = '[User] Logout',
}

export class UserAuth implements Action {
  public readonly type = UserActions.Auth;

  public constructor(public readonly username: string, public readonly password: string) {}
}

export class UserLoggedIn implements Action {
  public readonly type = UserActions.LoggedIn;

  public constructor(public readonly token: string) {}
}

export class UserLogout implements Action {
  public readonly type = UserActions.Logout;
}

export type UserActionsTypes = UserAuth | UserLoggedIn | UserLogout;
