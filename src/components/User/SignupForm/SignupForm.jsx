/* eslint react/no-string-refs:0 */
import { Button, Checkbox, Feedback, Grid, Input } from '@icedesign/base';
import { FormBinder as IceFormBinder, FormBinderWrapper as IceFormBinderWrapper, FormError as IceFormError } from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';
import axios from 'axios';
import React, { Component } from 'react';
import './SignupForm.scss';

const { Row, Col } = Grid;
const Toast = Feedback.toast;

export default class SignupForm extends Component {
  static displayName = 'SignupForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        account: undefined,
        password: undefined,
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    this.refs.form.validateAll((errors, values) => {
      data = values;
    });
    if (data.account === undefined || data.account === '') {
      return undefined;
    }
    if (data.password === undefined || data.password === '') {
      return undefined;
    }
    axios
      .post('/api/auth', {
        username: data.account,
        password: data.password,
      })
      .then((r) => {
        this.props.onLogin(r.data);
        Toast.success('登陆成功');
      })
      .catch((error) => {
        // console.log(error.response);
        if (error.response.data.message !== undefined) {
          Toast.error(error.response.data.message);
        } else {
          Toast.error('网络错误，请稍后重试');
        }
      });
  };

  render() {
    return (
      <div className="signup-form" style={styles.signupForm}>
        <div style={styles.formContainer}>
          <h4 style={styles.formTitle}>登录</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formItems}>
              <Row style={styles.formItem}>
                <Col>
                  <IceIcon
                    type="person"
                    size="small"
                    style={styles.inputIcon}
                  />
                  <IceFormBinder name="account" required message="必填">
                    <Input maxLength={20} placeholder="用户名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceIcon type="lock" size="small" style={styles.inputIcon} />
                  <IceFormBinder name="password">
                    <Input htmlType="password" placeholder="密码" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="account" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col>
                  <IceFormBinder name="checkbox">
                    <Checkbox>记住账号</Checkbox>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  style={styles.submitBtn}
                >
                  登 录
                </Button>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    );
  }
}


const styles = {
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 40px',
    background: '#fff',
    borderRadius: '6px',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '5px',
    color: '#999',
  },
  submitBtn: {
    width: '240px',
    background: '#3080fe',
    borderRadius: '28px',
  },
  tips: {
    textAlign: 'center',
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
