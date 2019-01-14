import { Balloon, Button, Icon, Dialog } from '@icedesign/base';
import IceImg from '@icedesign/img';
import FoundationSymbol from 'foundation-symbol';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../../utils/userRedux/actions';
import SignupForm from '../SignupForm';
import './User.scss';

@withRouter
class user extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: '小明',
      class1: '计科17-3',
      img: require('./images/avatar.png'),
    };
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

  onLoginClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onRegisterClick() {
    this.props.history.push('/register');
  }

  render() {
    const { login } = this.props.user.login;
    if (login) {
      return (
        <Balloon
          trigger={
            <div
              className="ice-design-header-userpannel"
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
              }}
            >
              <IceImg
                height={40}
                width={40}
                src={this.state.img}
                className="user-avatar"
              />
              <div className="user-profile">
                <span className="user-name" style={{ fontSize: '13px' }}>
                  {this.state.name}
                </span>
                <br />
                <span className="user-department">{this.state.class1}</span>
              </div>
              <Icon
                type="arrow-down-filling"
                size="xxs"
                className="icon-down"
              />
            </div>
          }
          closable={false}
          className="user-profile-menu"
        >
          <ul>
            <li className="user-profile-menu-item">
              <FoundationSymbol type="person" size="small" />
              我的主页
            </li>
            <li className="user-profile-menu-item">
              <FoundationSymbol type="repair" size="small" />
              信息设置
            </li>
            <li className="user-profile-menu-item">
              <FoundationSymbol type="compass" size="small" />
              退出
            </li>
          </ul>
        </Balloon>
      );
    }
    return (
      <div className="header-login">
        <Button type="light" className="login-item" onClick={this.onRegisterClick}>
          注册
        </Button>
        <Button type="primary" className="login-item" onClick={this.onLoginClick}>
          登陆
        </Button>
        <Dialog
          visible={this.state.visible}
          footer={false}
          onClose={this.onLoginClick}
        >
          <SignupForm />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapReducerToProps(reducer) {
  return {
    actions: bindActionCreators({ ...actions }, reducer),
  };
}

const User = connect(
  mapStateToProps,
  mapReducerToProps
)(user);
export default User;
