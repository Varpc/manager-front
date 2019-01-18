import React from 'react';
import { Table } from '@icedesign/base';
import axios from 'axios';
import './JiSuanKeTable.scss';

export default class JiSuanKeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      time: '',
    };
  }

  schemasData = (value) => {
    const data = value.map((v) => {
      return {
        type: v.type,
        contest: {
          name: v.contest,
          url: v.url,
        },
        begin_time: v.begin_time,
        time: v.time,
      };
    });
    return data;
  };

  componentDidMount() {
    axios
      .get('/api/contest/jisuanke')
      .then((r) => {
        this.setState({
          dataSource: this.schemasData(r.data.data), //
          time: r.data.time,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  renderContest = (value) => {
    return (
      // 使用"_blank"要使用rel="nofollow me noopener noreferrer"来赌注钓鱼安全漏洞
      <a href={value.url} target="_blank" rel="nofollow me noopener noreferrer">{value.name}</a>
    );
  };

  render() {
    return (
      <div>
        <div className="table-header">
          <div className="table-title">计蒜客</div>
          <div className="table-time">{`更新于@${this.state.time}`}</div>
        </div>
        <Table
          dataSource={this.state.dataSource}
          isLoading={this.state.isLoading}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column align="center" width={100} title="赛制" dataIndex="type" />
          <Table.Column
            align="center"
            width={300}
            title="比赛"
            dataIndex="contest"
            cell={this.renderContest}
          />
          <Table.Column align="center" title="开始时间" dataIndex="begin_time" />
          <Table.Column align="center" title="比赛时长" dataIndex="time" />
        </Table>
      </div>
    );
  }
}
