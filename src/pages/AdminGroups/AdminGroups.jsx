import React from 'react';
import { Nav } from '@icedesign/base';
import GroupsManage from './components/GroupsManage';
import ScoreManage from './components/ScoreManage';
import CreateGroup from './components/CreateGroup';
import './AdminGroups.scss';

const { Item } = Nav;

// 在这里可自动将数字字符串转为数字
const components = {
  1: <ScoreManage />,
  2: <GroupsManage />,
  3: <CreateGroup />,
};

export default class AdminGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '1',
    };
  }

  handleItemClick = (key) => {
    this.setState({
      key,
    });
  };

  render() {
    return (
      <div>
        <Nav
          className="nav"
          direction="hoz"
          activeDirection="bottom"
          defaultSelectedKeys={['1']}
        >
          <Item key="1" icon="service" onClick={this.handleItemClick}>
            分数管理
          </Item>
          <Item key="2" icon="favorite" onClick={this.handleItemClick}>
            队伍分配
          </Item>
          <Item key="3" icon="edit" onClick={this.handleItemClick}>
            新建队伍
          </Item>
        </Nav>
        {components[this.state.key]}
      </div>
    );
  }
}
