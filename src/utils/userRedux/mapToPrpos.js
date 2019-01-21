import { bindActionCreators } from 'redux';
import * as actions from './actions';

// redux store中的user数据映射函数
export function mapUserStateToProps(state) {
  return {
    user: state.user,
  };
}

// redux store中的user的action映射函数
export function mapUserReducerToProps(reducer) {
  return {
    actions: bindActionCreators({ ...actions }, reducer),
  };
}
