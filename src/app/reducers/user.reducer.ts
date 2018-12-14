import { UserActions, UserActionsTypes } from '../actions/user.actions';

export interface UserState {
  currentUserToken?: string;
}

const initialState: UserState = {
  currentUserToken: null
};

export function reducer(state = initialState, action: UserActionsTypes): UserState {
  switch (action.type) {
    case UserActions.LoggedIn: {
      return {
        ...state,
        currentUserToken: action.token,
      };
    }

    case UserActions.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
