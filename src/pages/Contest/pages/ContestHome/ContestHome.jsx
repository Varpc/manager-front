import { Feedback, Nav } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import GroupContest from './components/GroupContest';
import PersonalContest from './components/PersonalContest';

const { Item } = Nav;

export default class ContestHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      dataSource: [],
    };
  }

  componentDidMount() {
    const contestseasonId = this.props.match.params.contestseason;
    axios
      .get(`/api/contestseason/${contestseasonId}`)
      .then((r) => {
        this.setState({
          dataSource: r.data.data,
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
    // 获取来的数据中，type为0 为个人赛 1为组队赛
    switch (this.state.key) {
      case '1':
        return (
          <PersonalContest
            data={this.state.dataSource.filter(item => item.type === 0)}
          />
        );
      case '2':
        return (
          <GroupContest
            data={this.state.dataSource.filter(item => item.type === 1)}
          />
        );
      default:
        return (
          <PersonalContest
            data={this.state.dataSource.filter(item => item.type === 0)}
          />
        );
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
          <Item key="1" icon="account-filling" onClick={this.handleItemClick}>
            个人赛
          </Item>
          <Item key="2" icon="process" onClick={this.handleItemClick}>
            组队赛
          </Item>
        </Nav>
        {this.renderContent()}
      </div>
    );
  }
}
