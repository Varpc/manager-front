import React from 'react';
import IceContainer from '@icedesign/container';
import { Feedback } from '@icedesign/base';
import axios from 'axios';
import './ShowPost.scss';

export default class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.match.params.post_id,
      title: '',
      author: '',
      body: '',
      time: '',
    };
  }

  componentWillMount() {
    axios
      .get(`/api/post/${this.state.postId}`)
      .then((r) => {
        // console.log(r.data);
        this.setState({
          title: r.data.title,
          author: r.data.author,
          time: r.data.time,
          body: r.data.body,
        });
      })
      .catch(() => {
        Feedback.toast.error('获取失败');
      });
  }

  render() {
    return (
      <div className="show-post-container">
        <IceContainer>
          <h1>{this.state.title}</h1>
          <div className="show-post-author">
            <div>{this.state.author}</div>
            <div>@{this.state.time}</div>
          </div>
          <hr />
          <div
            dangerouslySetInnerHTML={{ __html: this.state.body }}
            className="show-post-body"
          />
        </IceContainer>
      </div>
    );
  }
}
