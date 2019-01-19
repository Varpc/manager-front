import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const LIGHT = require('./images/lightLogo.png');
const DARK = require('./images/darkLogo.png');

@withRouter
export default class Logo extends Component {
  handleToIndex = () => {
    this.props.history.push('/');
  };

  render() {
    const { isDark } = this.props;
    const logo = isDark ? DARK : LIGHT;
    return (
      <div
        className="logo"
        style={{
          height: 32,
          color: '#f40',
          textAlign: 'left',
        }}
      >
        <div
          style={{ display: 'block', position: 'relative' }}
          onClick={this.handleToIndex}
        >
          <img src={logo} width="114" alt="logo" />
        </div>
      </div>
    );
  }
}
