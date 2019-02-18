import React from 'react';
import { Nav, Feedback } from '@icedesign/base';
import axios from 'axios';
import ContestRank from './components/ContestRank';
import ContestScore from './components/ContestScore';

const { Item } = Nav;

export default class ShowContest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      data: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.showcontest;
    axios
      .get(`/api/contest/${id}`)
      .then((r) => {
        // console.log('r.data', r.data);
        this.setState({
          data: r.data,
        });
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  }

  handleItemClick = (key) => {
    this.setState({
      key,
    });
  };

  renderContent = () => {
    const key = this.state.key;
    // console.log('data--', this.state.data);
    // console.log('key', key);
    if (this.state.data !== null) {
      // 加if判断，防止在第一遍渲染时而数据没获取到而出错
      switch (key) {
        case '1':
          return (
            <ContestRank
              problemSum={this.state.data.problem_sum}
              penalty={this.state.data.penalty}
              data={this.state.data.data}
            />
          ); // data.data为vj上的榜单数据
        case '2':
          return <ContestScore />; // todo: 积分统计
        default:
          return (
            <ContestRank
              problemSum={this.state.data.problem_sum}
              penalty={this.state.data.penalty}
              data={this.state.data.data}
            />
          );
      }
    }
  };

  render() {
    return (
      <div>
        <Nav
          direction="hoz"
          activeDirection="bottom"
          defaultSelectedKeys={['1']}
        >
          <Item key="1" icon="text" onClick={this.handleItemClick}>
            赛后榜单
          </Item>
          <Item key="2" icon="calendar" onClick={this.handleItemClick}>
            积分统计
          </Item>
        </Nav>
        {this.renderContent()}
      </div>
    );
  }
}
