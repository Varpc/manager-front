import React from 'react';
import IceContainer from '@icedesign/container';
import HF from '../../layouts/HeaderFooterLayout';
import './Contest.scss';

export default class Contest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HF>
        <div className="contest-container">
          <div className="page-header">
            <div className="page-title">比赛统计</div>
          </div>
          <IceContainer>{this.props.children}</IceContainer>
        </div>
      </HF>
    );
  }
}
