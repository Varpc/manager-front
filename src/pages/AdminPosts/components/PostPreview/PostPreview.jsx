import React from 'react';
import IceContainer from '@icedesign/container';
import { Feedback } from '@icedesign/base';
import axios from 'axios';
import './PostPreview.scss';

export default class PostPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.postId,
      body: '',
      title: '',
      author: '',
      time: '',
    };
  }

  componentWillReceiveProps(newProps) {
    this.state.postId = newProps.postId;
    this.componentDidMount();
  }

  componentDidMount() {
    axios.get(`/api/post/${this.state.postId}`).then((r) => {
      this.setState({
        body: r.data.body,
        title: r.data.title,
        author: r.data.author,
        time: r.data.time,
      });
    }).catch((e) => {
      console.log('error', e);
      Feedback.toast.error('网络错误，请稍后重试');
    });
  }

  render() {
    return (
      <div className="post-preview-container">
        <IceContainer>
          <h1>{this.state.title}</h1>
          <div className="post-preview-author">
            <div>{this.state.author}</div>
            <div>@{this.state.time}</div>
          </div>
          <hr />
          <div
            dangerouslySetInnerHTML={{ __html: this.state.body }}
            className="post-preview-body"
          />
        </IceContainer>
      </div>
    );
  }
}
