import { combineReducers } from 'redux';
import userReducer from '../utils/userRedux/reducer';

const reducerMap = {
  user: userReducer,
};

export default combineReducers(reducerMap);
