import React from 'react';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import { Input, Grid, Button, Feedback } from '@icedesign/base';
import axios from 'axios';
import './CreateGroup.scss';

const { Row, Col } = Grid;

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        no: '',
        describe: '',
      },
    };
  }

  handleSubmit = () => {
    // eslint-disable-next-line react/no-string-refs
    const { validateFields } = this.refs.form;

    validateFields((errors, values) => {
      // console.log({ errors });
      // console.log(values);

      if (!errors) {
        axios.post('/api/admin/groups', {
          ...values,
        }).then(() => {
          Feedback.toast.success('创建成功');
        }).catch((e) => {
          const message = e.response.data.message;
          if (message) {
            Feedback.toast.error(message);
          } else {
            Feedback.toast.error('网络错误，请稍后重试');
          }
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          <div className="page-header">
            <div className="page-title">新建队伍</div>
          </div>
          <FormBinderWrapper value={this.state.value}
            // eslint-disable-next-line react/no-string-refs
            ref="form"
          >
            <Row className="row">
              <Col>
                <span>队伍名称：</span>
                <FormBinder required message="队伍名称必填" name="name">
                  <Input
                    className="input"
                    hasLimitHint
                    hasClear
                    size="large"
                    placeholder="请输入队伍名称"
                    trim
                  />
                </FormBinder>
                <FormError name="name" className="form-error" />
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <span>队伍编号：</span>
                <FormBinder required message="队伍编号必填" name="no">
                  <Input
                    className="input"
                    hasLimitHint
                    hasClear
                    size="large"
                    placeholder="请输入队伍编号"
                    trim
                  />
                </FormBinder>
                <FormError name="no" className="form-error" />
              </Col>
            </Row>
            <Row className="row">
              <Col>
                <span>队伍描述：</span>
                <FormBinder name="describe">
                  <Input
                    className="input"
                    hasLimitHint
                    hasClear
                    placeholder="请输入队伍描述(选填)"
                    trim
                    multiple
                    row="8"
                  />
                </FormBinder>
                <FormError name="describe" className="form-error" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="primary" onClick={this.handleSubmit} >提交</Button>
              </Col>
            </Row>
          </FormBinderWrapper>
        </div>
      </div>
    );
  }
}
