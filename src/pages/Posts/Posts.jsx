import { Button } from '@icedesign/base';
import React from 'react';
import { withRouter } from 'react-router-dom';
import List from './components/Lists';
import './Posts.scss';

@withRouter
export default class Posts extends React.Component {
  // 去往创建新总结页面
  handleToCraetePosts = () => {
    this.props.history.push('/postscreate');
  };

  render() {
    return (
      <div className="page-container">
        <div>
          <div className="page-header">
            <div className="page-title">比赛总结</div>
            <Button type="primary" onClick={this.handleToCraetePosts}>
              创建新总结
            </Button>
          </div>
          <List />
        </div>
      </div>
    );
  }
}
