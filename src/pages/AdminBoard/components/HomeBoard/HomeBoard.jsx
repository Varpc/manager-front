import { Button, Feedback } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import BraftEditor from 'braft-editor';
import RichEditor from '../../../../components/RichEditor';

export default class HomeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '/api/admin/home/board',
      editorState: BraftEditor.createEditorState(''),
    };
  }

  componentWillMount() {
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

  handleOnChange = (editorState) => {
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
        <RichEditor
          value={this.state.editorState}
          onChange={this.handleOnChange}
        />
        <hr />
        <Button
          type="primary"
          onClick={this.handleSubmit}
          styple={{ padding: '20px' }}
        >
          提交
        </Button>
      </div>
    );
  }
}
