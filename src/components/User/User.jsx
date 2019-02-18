/* eslint-disable no-mixed-operators */
import { Balloon, Button, Dialog, Feedback, Icon } from '@icedesign/base';
import IceImg from '@icedesign/img';
import FoundationSymbol from 'foundation-symbol';
import React from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  mapUserReducerToProps,
  mapUserStateToProps,
} from '../../utils/userRedux/mapToPrpos';
import SignupForm from './SignupForm';
import './User.scss';

const Toast = Feedback.toast;

// todo: 性能优化
@connect(
  mapUserStateToProps,
  mapUserReducerToProps
)
@withRouter
@withCookies
export default class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.cookies = this.props.cookies;
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.handleToMyHome = this.handleToMyHome.bind(this);
    this.handleToAdminHome = this.handleToAdminHome.bind(this);
  }

  componentDidMount() {
    const cookie = this.cookies.get('user');
    const isLogin = this.props.user.is_login;
    // console.log('cookie', cookie);
    if (!isLogin && cookie !== null && typeof cookie !== 'undefined') {
      // 这里要延时登陆。若不延时，不知为什么，当登录后，如果在有限制登陆的路由中F5刷新的话，即使是登陆的，但路由获取不到
      // 相关登陆的信息，也会按照没有登陆来渲染路由，可能和redux或者某些异步渲染有关，所以这里折中一下，等一会再更新store
      setTimeout(() => { this.props.actions.login(cookie); }, 500);
    }
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
  onLogin(data, saveInfo = false) {
    if (saveInfo) {
      const date = new Date();
      date.setTime(date.getTime() + 30 * 24 * 3600 * 1000);
      this.cookies.set('user', data, { path: '/', expires: date });
    } else {
      this.cookies.set('user', data);
    }
    this.props.actions.login(data);
    this.setState({
      visible: false,
    });
  }

  onLogout() {
    this.cookies.remove('user');
    this.props.actions.logout();
    this.props.history.push('/');
    Toast.success('登出成功');
  }

  // 去往指定页面
  handleToMyHome() {
    const url = `/myhome/${this.props.user.id}`;
    this.props.history.push(url);
  }

  handleToEditInfo = () => {
    const url = `/editinfo/${this.props.user.id}`;
    this.props.history.push(url);
  };

  handleToAdminHome() {
    this.props.history.push('/admin/home');
  }

  render() {
    const isLogin = this.props.user.is_login;
    const isAdmin = this.props.user.is_admin;
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
              <div onClick={this.handleToEditInfo}>
                <FoundationSymbol type="repair" size="small" />
                信息设置
              </div>
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
