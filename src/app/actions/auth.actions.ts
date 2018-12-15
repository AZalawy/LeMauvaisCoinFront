import { Action } from '@ngrx/store';

export enum AuthActions {
  Auth = '[Auth] Authenticate',
  LoggedIn = '[Auth] Logged in',
  Logout = '[Auth] Logout',
}

export class Auth implements Action {
  public readonly type = AuthActions.Auth;

  public constructor(public readonly username: string, public readonly password: string) { }
}

export class LoggedIn implements Action {
  public readonly type = AuthActions.LoggedIn;

  public constructor(public readonly token: string) { }
}

export class Logout implements Action {
  public readonly type = AuthActions.Logout;
}

export type AuthActionsTypes = Auth | LoggedIn | Logout;
