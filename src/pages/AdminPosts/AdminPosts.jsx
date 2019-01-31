import React from 'react';
import { Grid } from '@icedesign/base';
import List from './components/Lists';
import PostPreview from './components/PostPreview';
import './AdminPosts.scss';

const { Col, Row } = Grid;

export default class AdminPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: 1,
    };
  }

  onTitleClick = (id) => {
    this.setState({
      postId: id,
    });
  }


  render() {
    return (
      <div className="admin-posts-container">
        <div>
          <div className="admin-posts-header">
            <div className="admin-posts-title">总结管理</div>
          </div>
          <Row>
            <Col span="8">
              <List onTitleClick={this.onTitleClick} />
            </Col>
            <Col span="16">
              <PostPreview postId={this.state.postId} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
