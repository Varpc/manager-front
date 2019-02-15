import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Table } from '@icedesign/base';
import './GroupContest.scss';

const getDate = () => {
  const data = [];
  for (let i = 0; i <= 20; i += 1) {
    data.push({
      id: i,
      name: `Group Contest ${i}`,
      time: '2019-3-5',
      length: '3 hour',
      creator: 'admin',
    });
  }
  return data;
};

@withRouter
export default class GroupContest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {
    this.setState({
      dataSource: getDate().map((item) => {
        return {
          ...item,
          contest: {
            name: item.name,
            id: item.id,
          },
        };
      }),
    });
  }

  renderTableName = (contest) => {
    // console.log(this.props.location);
    const path =
      `${this.props.location.pathname}/${contest.id}`;
    return <Link to={path}>{contest.name}</Link>;
  };

  render() {
    return (
      <div>
        <Table dataSource={this.state.dataSource}
          className="group-contest-table"
        >
          <Table.Column
            title="名称"
            dataIndex="contest"
            cell={this.renderTableName}
          />
          <Table.Column title="时间" dataIndex="time" />
          <Table.Column title="时长" dataIndex="length" />
          <Table.Column title="创建者" dataIndex="creator" />
        </Table>
      </div>
    );
  }
}
