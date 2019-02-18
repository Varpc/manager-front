/* eslint react/no-string-refs:0 */
import { Button, Feedback, Grid, Input } from '@icedesign/base';
import {
  FormBinder as IceFormBinder,
  FormBinderWrapper as IceFormBinderWrapper,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import axios from 'axios';
import React, { Component } from 'react';
import notification from '@icedesign/notification';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { login } from '../../../../utils/userRedux/actions';
import './RegisterFormPage.scss';

const { Row, Col } = Grid;

const Toast = Feedback.toast;

@withRouter
class register extends Component {
  static displayName = 'register';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        name: '',
        banji: '',
        passwd: '',
        rePasswd: '',
      },
    };
  }

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  onSuccessRegister = (data) => {
    const args = {
      message: '您已成功注册',
      description: '请先到设置中完善您的资料',
      placement: 'bottomRight',
      duration: 0,
    };
    this.props.actions.login(data);
    this.props.history.push('/');
    Toast.success('注册成功');
    notification.success(args);
  };

  handleSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      axios
        .post('/api/register', {
          username: values.username,
          password: values.passwd,
          class_: values.banji,
          name: values.name,
        })
        .then((r) => {
          this.onSuccessRegister(r.data);
        })
        .catch((e) => {
          if (
            e.response !== undefined &&
            e.response.data.message !== undefined
          ) {
            Toast.error(e.response.data.message);
          } else {
            Toast.error('网络错误');
          }
        });
    });
  };

  render() {
    return (
      <div style={styles.container} className="user-register">
        <div style={styles.header}>
          <a href="#" style={styles.meta}>
            <img
              style={styles.logo}
              src={require('./images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
              alt="logo"
            />
          </a>
          <p style={styles.desc}>欢迎注册Manager管理系统</p>
        </div>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>注 册</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder
                    name="username"
                    required
                    message="请输入正确的用户名"
                  >
                    <Input size="large" placeholder="用户名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="username" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon
                    type="yonghu"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder name="name" required message="请输入真实姓名">
                    <Input size="large" maxLength={20} placeholder="真实姓名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="home" size="small" style={styles.inputIcon} />
                  <IceFormBinder name="banji" required message="请输入班级">
                    <Input size="large" maxLength={20} placeholder="班级" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="banji" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="至少8位密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col style={styles.formItemCol}>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder
                    name="rePasswd"
                    required
                    validator={(rule, values, callback) =>
                      this.checkPasswd2(
                        rule,
                        values,
                        callback,
                        this.state.value
                      )
                    }
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="确认密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  注 册
                </Button>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
function mapStateToProps(state) {
  return {};
}

function mapReducerToProps(reducer) {
  return {
    actions: bindActionCreators({ login }, reducer),
  };
}

const Register = connect(
  mapStateToProps,
  mapReducerToProps
)(register);

export default Register;

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    paddingTop: '100px',
    background: '#f0f2f5',
    backgroundImage: `url${require('./images/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png')}`,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  title: {
    textAlign: 'center',
    fontSize: '33px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: 'Myriad Pro, Helvetica Neue, Arial, Helvetica, sans-serif',
    fontWeight: '600',
  },
  desc: {
    margin: '10px 0',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  logo: {
    marginRight: '10px',
    width: '48px',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '368px',
    margin: '0 auto',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
    padding: '0',
  },
  formItemCol: {
    position: 'relative',
    padding: '0',
  },
  formTitle: {
    textAlign: 'center',
    margin: '0 0 20px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
  },
  submitBtn: {
    fontSize: '16px',
    height: '40px',
    lineHeight: '40px',
    background: '#3080fe',
    borderRadius: '4px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    justifyContent: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};
