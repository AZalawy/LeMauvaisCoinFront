import { AuthActions, AuthActionsTypes } from '../actions/auth.actions';

export interface AuthState {
  currentUserToken?: string;
}

const initialState: AuthState = {
  currentUserToken: null
};

export function reducer(state = initialState, action: AuthActionsTypes): AuthState {
  switch (action.type) {
    case AuthActions.LoggedIn: {
      return {
        ...state,
        currentUserToken: action.token,
      };
    }

    case AuthActions.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
