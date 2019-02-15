import React from 'react';
import { Nav } from '@icedesign/base';
import GroupContest from './components/GroupContest';
import PersonalContest from './components/PersonalContest';

const { Item } = Nav;

export default class ContestHome extends React.Component {
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
    switch (this.state.key) {
      case '1':
        return <PersonalContest />;
      case '2':
        return <GroupContest />;
      default:
        return <PersonalContest />;
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
