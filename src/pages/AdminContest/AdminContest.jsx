import React from 'react';
import { Nav } from '@icedesign/base';
import AdminContestTable from './components/AdminContestTable';
import AdminContestAdd from './components/AdminContestAdd';
import AdminContestCreate from './components/AdminContestCreate';
import './AdminContest.scss';

const { Item } = Nav;

export default class AdminContest extends React.Component {
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
  }

  renderContest = () => {
    const key = this.state.key;
    switch (key) {
      case '1':
        return <AdminContestTable />;
      case '2':
        return <AdminContestAdd />;
      case '3':
        return <AdminContestCreate />;
      default:
        return <h1>Hello</h1>;
    }
  }

  render() {
    return (
      <div>
        <Nav
          className="admin-contest-nav"
          direction="hoz"
          activeDirection="bottom"
          defaultSelectedKeys={['1']}
        >
          <Item key="1" onClick={this.handleItemClick} >赛季总览</Item>
          <Item key="2" onClick={this.handleItemClick} >添加比赛</Item>
          <Item key="3" onClick={this.handleItemClick} >新建赛季</Item>
        </Nav>
        {this.renderContest()}
      </div>
    );
  }
}
