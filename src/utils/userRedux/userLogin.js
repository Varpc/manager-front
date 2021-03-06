import { USER_LOGIN } from './constants';

export function login(data) {
  return {
    type: USER_LOGIN,
    data: {
      is_login: true,
      ...data,
    },
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
