import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Table } from '@icedesign/base';
import './PersonalContest.scss';

@withRouter
export default class PersonalContest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {
    const data = this.props.data;
    this.setState({
      dataSource: this.formatData(data),
    });
  }

  componentWillReceiveProps(newProps) {
    const data = newProps.data;
    this.setState({
      dataSource: this.formatData(data),
    });
  }

  // 格式化数据
  formatData = (data) => {
    // console.log('data', data);
    const date = new Date();
    return data.map((item) => {
      date.setTime(item.date);
      const timeStr =
        `${this.formatDate(date)} ${this.formatSeconds(item.time)}`;
      return {
        contest: {
          id: item.id,
          name: item.name,
        },
        time: timeStr,
        length: this.formatSeconds(item.length),
        creator: item.creator,
      };
    });
  };

  // 格式化时间
  formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // 格式化时间：将秒改成时分秒的格式
  formatSeconds = (result) => {
    const h =
      Math.floor(result / 3600) < 10
        ? `0${Math.floor(result / 3600)}`
        : Math.floor(result / 3600);
    const m =
      Math.floor((result / 60) % 60) < 10
        ? `0${Math.floor((result / 60) % 60)}`
        : Math.floor((result / 60) % 60);
    const s =
      Math.floor(result % 60) < 10
        ? `0${Math.floor(result % 60)}`
        : Math.floor(result % 60);
    return (result = `${h}:${m}:${s}`);
  };

  renderTableName = (contest) => {
    // console.log(this.props.location);
    const path = `${this.props.location.pathname}/${contest.id}`;
    return <Link to={path}>{contest.name}</Link>;
  };

  render() {
    return (
      <div>
        <Table
          dataSource={this.state.dataSource}
          className="personal-contest-table"
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
