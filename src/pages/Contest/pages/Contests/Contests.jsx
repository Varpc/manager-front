import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from '@icedesign/base';
import RuleWindow from './RuleWindow';
import './Contests.scss';

const getData = () => {
  const data = [];
  for (let i = 0; i <= 10; i += 1) {
    data.push({
      id: 1,
      name: '222222222222222222222222',
      time: '@2019-1-1 -- @2019-2-2',
      rule: '<h1>Hello</h1>',
      creator: 'admin',
    });
  }
  return data;
};

export default class Contests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {
    const data = getData();
    this.setState({
      dataSource: data.map((item) => {
        return {
          ...item,
          contest: {
            id: item.id,
            name: item.name,
          },
        };
      }),
    });
  }

  renderTableName = (contest) => {
    return (
      <Link to={`/contest/${contest.id}`}>{contest.name}</Link>
    );
  }

  renderTableRule = (rule) => {
    return (
      <RuleWindow rule={rule} />
    );
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <Table dataSource={this.state.dataSource} className="table">
        <Table.Column title="名称" dataIndex="contest" cell={this.renderTableName} />
        <Table.Column title="时间" dataIndex="time" />
        <Table.Column title="规则" dataIndex="rule" cell={this.renderTableRule} />
        <Table.Column title="创建者" dataIndex="creator" />
      </Table>
    );
  }
}
