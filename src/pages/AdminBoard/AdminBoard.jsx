import React from 'react';
import axios from 'axios';
import { Feedback } from '@icedesign/base';
import HomeBoard from './components/HomeBoard';
import HomeImageUpload from './components/HomeImageUpload';
import './AdminBoard.scss';

export default class AdminBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadImage: false,
      defaultFileList: [],
    };
  }

  componentWillMount() {
    axios
      .get('/api/admin/home/image')
      .then((r) => {
        this.setState({
          isLoadImage: true,
          defaultFileList: r.data.data.map((value) => {
            return { ...value, status: 'done' };
          }),
        });
      })
      .catch((e) => {
        console.log('e', e);
        Feedback.toast.error('获取原始图片数据失败');
      });
  }

  render() {
    return (
      <div className="editor-container">
        <div>
          <div className="title">首页轮播图片</div>
          {this.state.isLoadImage && <HomeImageUpload defaultFileList={this.state.defaultFileList} /> }
          <div className="title">首页公告板内容</div>
          <HomeBoard />
        </div>
      </div>
    );
  }
}
