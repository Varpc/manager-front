import React from 'react';
import './GroupsManage.scss';

export default class GroupsManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <div className="page-title">队伍分配</div>
        </div>
      </div>
    );
  }
}
