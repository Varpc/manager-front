import { USER_LOGIN } from './constants';

export function login() {
  return {
    type: USER_LOGIN,
  };
}

// 此处留坑
export function reducer(state, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        login: true,
      };
    default:
      return state;
  }
}
