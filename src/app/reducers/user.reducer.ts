import { UserActions, UserActionsTypes, UserLoggedIn } from '../actions/user.actions';
import { User } from '../models/user';

export interface UserState {
  currentUser?: User;
  users: User[];
}

const initialState: UserState = {
  currentUser: null,
  users: [],
};

export function reducer(state = initialState, action: UserActionsTypes): UserState {
  switch (action.type) {
    case UserActions.LoggedIn: {
      return {
        ...state,
        currentUser: action.user,
      };
    }

    case UserActions.AllUsersLoaded: {
      return {
        ...state,
        users: [...action.users],
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
