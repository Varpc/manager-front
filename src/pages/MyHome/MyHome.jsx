import React from 'react';
import UserInfo from './components/UserInfo';
import './MyHome.scss';

export default class MyHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      // react-router当url参数改变时不能自动更新页面，为了url参数改变时能够自动更新
      // 在子组件中使用componentWillReceiveProps()，当props改变时会自动调用该函数
      // 但是现在url的参数是直接作用在page(当前页面组件)上的，为了让子组件监测到props
      // 的变化，将props全部传给子组件
      <UserInfo {...this.props} />
    );
  }
}
