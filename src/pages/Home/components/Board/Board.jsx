import React from 'react';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import './Board.scss';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: undefined,
    };
  }

  componentWillMount() {
    axios.get('/api/admin/home/board').then((r) => {
      this.setState({
        html: r.data.html,
      });
    }).catch((e) => {
      console.log('board error:', e);
      this.setState({
        html: '网络错误，加载失败',
      });
    });
  }

  render() {
    console.log(this.state.html);
    return (
      <IceContainer className="board-container">
        <div>
          <div className="title">公告</div>
          <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
        </div>
      </IceContainer>
    );
  }
}
