import { USER_LOGOUT } from './constants';

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        ...state,
        is_login: false,
      };
    default:
      return state;
  }
}
