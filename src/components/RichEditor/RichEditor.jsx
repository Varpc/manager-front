import React from 'react';
import axios from 'axios';
import { Prompt } from 'react-router-dom';
import { Feedback, Button } from '@icedesign/base';
import BraftEditor from 'braft-editor';
import './RichEditor.scss';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(''),
      url: this.props.url,
      default: this.props.default ? this.props.default : false,
    };
  }

  componentWillMount() {
    if (this.state.default) {
      axios
        .get(this.state.url)
        .then((r) => {
          this.setState({
            editorState: BraftEditor.createEditorState(r.data.html),
          });
        })
        .catch((e) => {
          console.log(e);
          Feedback.toast.error('获取原始数据失败，请稍后重试');
        });
    }
  }

  handleChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleSubmit = () => {
    axios
      .post(this.state.url, {
        html: this.state.editorState.toHTML(),
      })
      .then(() => {
        Feedback.toast.success('提交成功');
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  };

  render() {
    return (
      <div>
        {/* <Prompt message="数据还未提交，确认离开吗？" /> */}
        <BraftEditor
          value={this.state.editorState}
          onChange={this.handleChange}
        />
        <hr />
        <Button type="primary" onClick={this.handleSubmit}>
          提交
        </Button>
      </div>
    );
  }
}
