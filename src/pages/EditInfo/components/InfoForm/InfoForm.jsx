import { Button, Feedback, Input } from '@icedesign/base';
import {
  FormBinder,
  FormBinderWrapper,
  FormError,
} from '@icedesign/form-binder';
import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  mapUserReducerToProps,
  mapUserStateToProps,
} from '../../../../utils/userRedux/mapToPrpos';
import './InfoForm.scss';

@connect(
  mapUserStateToProps,
  mapUserReducerToProps
)
export default class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.id,
      value: {
        blog: this.props.user.blog ? this.props.user.blog : '',
        banji: this.props.user.banji,
        vjid: this.props.user.vjid ? this.props.user.vjid : '',
        codeforces: this.props.user.codeforces
          ? this.props.user.codeforces
          : '',
        password: '',
        confirmPassword: '',
        name: this.props.user.name,
      },
    };
  }

  checkPassword = (rule, values, callback) => {
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

  checkConfirmPassword = (rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== this.state.value.password) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  onClick = () => {
    let { name, banji, vjid } = this.state.value;
    const { codeforces, blog, password, confirmPassword } = this.state.value;
    name = name.replace(/[ ]/g, '');
    banji = banji.replace(/[ ]/g, '');
    vjid = vjid.replace(/[ ]/g, '');
    if (name === '') {
      Feedback.toast.prompt('姓名不可为空');
      return;
    }
    if (banji === '') {
      Feedback.toast.prompt('班级不可为空');
      return;
    }
    if (vjid === '') {
      Feedback.toast.prompt('Virtual Judge用户名不可为空');
      return;
    }

    if (password !== confirmPassword) {
      Feedback.toast.prompt('两次密码不一致');
      return;
    }
    if ((password.length < 8 || password.length > 16) && password !== '') {
      Feedback.toast.prompt('密码应在8到16为之间');
      return;
    }

    const data = {
      name,
      banji,
      vjid,
    };
    if (blog !== '') {
      data.blog = blog;
    }
    if (password !== '') {
      data.password = password;
    }
    if (codeforces !== '') {
      data.codeforces = codeforces;
    }
    axios
      .post(`/api/user/${this.state.userId}`, { ...data })
      .then(() => {
        Feedback.toast.success('修改成功');
        this.props.actions.updateInfo(data); // 更新store
      })
      .catch(() => {
        Feedback.toast.error('似乎出了些错误，请稍后重试');
      });
  };

  render() {
    return (
      <div style={styles.container}>
        <FormBinderWrapper value={this.state.value} onChange={this.formChange}>
          <div style={styles.content}>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>名字：</span>
              <FormBinder name="name" required message="请输入正确的名字">
                <Input placeholder="真实姓名" style={{ width: '400px' }} />
              </FormBinder>
              <FormError style={styles.formItemError} name="name" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>班级：</span>
              <FormBinder name="banji" required message="请输入正确的班级">
                <Input placeholder="班级" style={{ width: '400px' }} />
              </FormBinder>
              <FormError style={styles.formItemError} name="baji" />
            </div>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>VJudge ID：</span>
              <FormBinder name="vjid" required message="Virtual Judge用户名">
                <Input
                  placeholder="请输入Virtual Judge用户名"
                  style={{ width: '400px' }}
                />
              </FormBinder>
              <FormError style={styles.formItemError} name="vjid" />
            </div>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>Codeforces：</span>
              <FormBinder name="codeforces">
                <Input
                  placeholder="请输入Codeforces用户名(可选)"
                  style={{ width: '400px' }}
                />
              </FormBinder>
              <FormError style={styles.formItemError} name="codeforces" />
            </div>
            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>博客：</span>
              <FormBinder name="blog" type="url" message="请输入正确的url">
                <Input
                  placeholder="博客地址(可选)"
                  style={{ width: '400px' }}
                />
              </FormBinder>
              <FormError style={styles.formItemError} name="blog" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>新密码：</span>
              <FormBinder name="password" validator={this.checkPassword}>
                <Input
                  htmlType="password"
                  placeholder="输入新密码(可选)"
                  style={{ width: '400px' }}
                />
              </FormBinder>
              <FormError style={styles.formItemError} name="password" />
            </div>

            <div style={styles.formItem}>
              <span style={styles.formItemLabel}>确认密码：</span>
              <FormBinder
                name="confirmPassword"
                validator={this.checkConfirmPassword}
              >
                <Input
                  htmlType="password"
                  placeholder="输入确认密码(可选)"
                  style={{ width: '400px' }}
                />
              </FormBinder>
              <FormError style={styles.formItemError} name="confirmPassword" />
            </div>

            <Button
              type="primary"
              onClick={this.onClick}
              style={{ marginLeft: '400px' }}
            >
              提 交
            </Button>
          </div>
        </FormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  formItem: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  formItemLabel: {
    width: '120px',
    mariginRight: '10px',
    display: 'inline-block',
    textAlign: 'right',
  },
  formItemError: {
    marginLeft: '10px',
  },
  preview: {
    border: '1px solid #eee',
    marginTop: 20,
    padding: 10,
  },
};
