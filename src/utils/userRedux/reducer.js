import { reducer as userLoginReducer } from './userLogin';
import { reducer as userLogoutReducer } from './userLogout';
import { reducer as updateInfoReducer } from './updateInfo';

const initState = {
  is_login: false,
  is_admin: false,
  id: '',
  token: '',
  name: '',
  banji: '',
  username: '',
  image: '',
  vjid: '',
};

const reducers = [
  userLoginReducer,
  userLogoutReducer,
  updateInfoReducer,
];

export default function reducer(state = initState, action) {
  let newState;
  switch (action.type) {
    default:
      newState = state;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
