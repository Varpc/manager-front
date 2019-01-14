import { reducer as userLoginReducer } from './userLogin';
import { reducer as userLogoutReducer } from './userLogout';

const initState = {
  login: false,
};

const reducers = [
  userLoginReducer,
  userLogoutReducer,
];

export default function reducer(state = initState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
