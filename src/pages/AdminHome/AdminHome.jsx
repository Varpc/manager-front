import React from 'react';
import './AdminHome.scss';

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>欢迎来到管理后台</h1>
      </div>
    );
  }
}
