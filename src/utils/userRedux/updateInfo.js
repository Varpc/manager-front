import { UPDATE_INFO } from './constants';

export function updateInfo(data) {
  return {
    type: UPDATE_INFO,
    data: {
      ...data,
    },
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_INFO:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
