import React from 'react';
import { Nav } from '@icedesign/base';
import ContestRank from './components/ContestRank';
import ContestScore from './components/ContestScore';

const { Item } = Nav;

export default class ShowContest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
    };
  }

  handleItemClick = (key) => {
    this.setState({
      key,
    });
  };

  renderContent = () => {
    const key = this.state.key;
    console.log('key', key);
    switch (key) {
      case '1':
        return <ContestRank />;
      case '2':
        return <ContestScore />;
      default:
        return <ContestRank />;
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
