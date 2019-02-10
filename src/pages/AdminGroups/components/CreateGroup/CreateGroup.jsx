import React from 'react';

import './CreateGroup.scss';

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <div className="page-title">新建队伍</div>
        </div>
      </div>
    );
  }
}
