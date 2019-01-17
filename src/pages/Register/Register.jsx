import React, { Component } from 'react';
import RegisterFormPage from './components/RegisterFormPage';

export default class Register extends Component {
  static displayName = 'Register';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="register1-page">
        <RegisterFormPage />
      </div>
    );
  }
}
