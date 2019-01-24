import React from 'react';
import axios from 'axios';
import { Input, Button, Feedback } from '@icedesign/base';
import { connect } from 'react-redux';
import IceContainer from '@icedesign/container';
import { RichEditor, createEditorState } from '../../components/RichEditor';
import {
  mapUserReducerToProps,
  mapUserStateToProps,
} from '../../utils/userRedux/mapToPrpos';
import './PostsCreate.scss';

const Toast = Feedback.toast;

@connect(
  mapUserStateToProps,
  mapUserReducerToProps
)
export default class PostsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorState(''),
      title: '',
    };
  }

  handleTitleChange = (title) => {
    this.setState({
      title,
    });
  };

  handleEditorChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleSubmit = () => {
    if (!this.props.user.is_login) {
      Toast.prompt('请先登陆');
      return;
    }
    const { title } = this.state;
    if (title === null || title === undefined || title === '') {
      Toast.prompt('标题不可为空');
      return;
    }
    const html = this.state.editorState.toHTML();
    if (
      html === null ||
      title === undefined ||
      html === '' ||
      html === '<p></p>'
    ) {
      Toast.prompt('内容不可为空');
      return;
    }
    axios
      .post('/api/post', {
        body: html,
        title,
        author: this.props.user.name,
        user_id: this.props.user.id,
      })
      .then(() => {
        Toast.success('提交成功');
      })
      .catch(() => {
        Toast.error('提交失败，请稍后重试');
      });
  };

  render() {
    return (
      <div className="page-container">
        <div className="page-title">创建文章</div>
        <IceContainer>
          <Input
            value={this.state.title}
            onChange={this.handleTitleChange}
            addonBefore="标题"
            size="large"
            placeholder="请输入标题"
            style={{ width: '500px', marginBottom: '15px' }}
            hasClear
            hasLimitHint
            trim
          />
          <RichEditor
            value={this.state.editorState}
            onChange={this.handleEditorChange}
          />
          <hr />
          <Button type="primary" onClick={this.handleSubmit}>
            提交
          </Button>
        </IceContainer>
      </div>
    );
  }
}
