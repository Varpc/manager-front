import { Balloon, Button, Icon, Dialog, Feedback } from '@icedesign/base';
import IceImg from '@icedesign/img';
import FoundationSymbol from 'foundation-symbol';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../../utils/userRedux/actions';
import SignupForm from './SignupForm';
import './User.scss';

const Toast = Feedback.toast;

@withRouter
class user extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.handleToMyHome = this.handleToMyHome.bind(this);
    this.handleToAdminHome = this.handleToAdminHome.bind(this);
  }

  // 登陆注册按钮
  onLoginClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onRegisterClick() {
    this.props.history.push('/register');
  }

  // 登陆登出时触发
  onLogin(data) {
    this.props.actions.login(data);
    this.setState({
      visible: false,
    });
  }

  onLogout() {
    this.props.actions.logout();
    Toast.success('登出成功');
  }

  // 去往指定页面
  handleToMyHome() {
    const url = `/myhome/${this.props.user.id}`;
    this.props.history.push(url);
  }

  handleToAdminHome() {
    this.props.history.push('/admin/home');
  }

  render() {
    const isLogin = this.props.user.is_login;
    const isAdmin = this.props.user.is_admin;
    // 头像未解决 留坑
    const { name, banji, image } = this.props.user;
    const manager = (
      <li className="user-profile-menu-item">
        <div onClick={this.handleToAdminHome}>
          <FoundationSymbol type="ul-list" size="small" />
          队伍管理
        </div>
      </li>
    );
    if (isLogin) {
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
                src={image}
                className="user-avatar"
              />
              <div className="user-profile">
                <span className="user-name" style={{ fontSize: '13px' }}>
                  {name}
                </span>
                <br />
                <span className="user-department">{banji}</span>
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
              <div onClick={this.handleToMyHome}>
                <FoundationSymbol type="person" size="small" />
                我的主页
              </div>
            </li>
            {isAdmin && manager}
            <li className="user-profile-menu-item">
              <FoundationSymbol type="repair" size="small" />
              信息设置
            </li>
            <li className="user-profile-menu-item">
              <div onClick={this.onLogout}>
                <FoundationSymbol type="compass" size="small" />
                退出
              </div>
            </li>
          </ul>
        </Balloon>
      );
    }
    return (
      <div className="header-login">
        <Button
          type="light"
          className="login-item"
          onClick={this.onRegisterClick}
        >
          注册
        </Button>
        <Button
          type="primary"
          className="login-item"
          onClick={this.onLoginClick}
        >
          登陆
        </Button>
        <Dialog
          visible={this.state.visible}
          footer={false}
          onClose={this.onLoginClick}
        >
          <SignupForm onLogin={this.onLogin} />
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
