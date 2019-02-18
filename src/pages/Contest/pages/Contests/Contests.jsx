import { Table, Feedback } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './Contests.scss';
import RuleWindow from './RuleWindow';

export default class Contests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  // 格式化数据
  formatData = (data) => {
    // console.log('data', data);
    const beginTime = new Date();
    const endTime = new Date();
    return data.map((item) => {
      beginTime.setTime(item.begin_time);
      endTime.setTime(item.end_time);
      const time = `${this.formatDate(beginTime)} -- ${this.formatDate(
        endTime
      )}`;
      return {
        contest: {
          id: item.id,
          name: item.name,
        },
        id: item.id,
        name: item.name,
        rule: item.rule,
        time,
        creator: item.creator,
      };
    });
  };

  // 格式化时间
  formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  componentDidMount() {
    axios
      .get('/api/contestseason')
      .then((r) => {
        this.setState({
          dataSource: this.formatData(r.data.data),
        });
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  }

  renderTableName = (contest) => {
    return <Link to={`/contest/${contest.id}`}>{contest.name}</Link>;
  };

  renderTableRule = (rule) => {
    return <RuleWindow rule={rule} />;
  };

  render() {
    return (
      <Table dataSource={this.state.dataSource} className="table">
        <Table.Column
          title="名称"
          dataIndex="contest"
          cell={this.renderTableName}
        />
        <Table.Column title="时间" dataIndex="time" />
        <Table.Column
          title="规则"
          dataIndex="rule"
          cell={this.renderTableRule}
        />
        <Table.Column title="创建者" dataIndex="creator" />
      </Table>
    );
  }
}
