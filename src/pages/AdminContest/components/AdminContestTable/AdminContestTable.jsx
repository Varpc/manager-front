import { Feedback, Table } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import AdminContestCmd from './AdminContestCmd';
import './AdminContestTable.scss';
import RuleWindow from './RuleWindow';

export default class AdminContestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      data: [],
    };
  }

  // 格式化数据
  formatData = (data) => {
    console.log('data', data);
    const beginTime = new Date();
    const endTime = new Date();
    return data.map((item) => {
      beginTime.setTime(item.begin_time);
      endTime.setTime(item.end_time);
      const time = `${this.formatDate(beginTime)} -- ${this.formatDate(
        endTime
      )}`;
      return {
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
      .get('/api/admin/contestseason')
      .then((r) => {
        const data = r.data.data;
        this.setState({
          data,
          dataSource: this.formatData(data),
        });
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  }

  // 删除一行时的回调函数
  handleOnDelete = (id) => {
    const data = this.state.data.filter(item => item.id !== id);
    this.setState({
      data,
      dataSource: this.formatData(data),
    });
  };

  // 改变一行时的回调函数
  handleOnEdit = (id, newItem) => {
    // 再AdminContestCmd 和 AdminContestEdit中时间都是以beginTime和endTime来传递的
    // 这里要和此组件的数据统一格式，故作此转换，这里数据有冗余，但影响不大
    const data = this.state.data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...newItem,
          begin_time: newItem.beginTime,
          end_time: newItem.endTime,
        };
      }
      return item;
    });
    this.setState({
      data,
      dataSource: this.formatData(data),
    });
  };

  renderTableName = (contest) => {
    return <div>{contest.name}</div>;
  };

  renderTableRule = (rule) => {
    return <RuleWindow rule={rule} />;
  };

  renderTableCmd = (id) => {
    let tmp = null;
    for (let i = 0; i < this.state.data.length; i += 1) {
      if (this.state.data[i].id === id) {
        tmp = this.state.data[i];
        break;
      }
    }
    // 这里较复杂，没有使用redux，AdminContestTable <--> AdminContestCmd <--> AdminContestEdit 三者之间全部使用回调函数来传递值
    return (
      <AdminContestCmd
        data={tmp}
        onDelete={this.handleOnDelete}
        onEdit={this.handleOnEdit}
      />
    );
  };

  render() {
    return (
      <div className="admin-contest-table-container">
        <div className="page-header">
          <div className="page-title">赛季总览</div>
        </div>
        <Table dataSource={this.state.dataSource} style={styles.table}>
          <Table.Column title="名称" dataIndex="name" align="center" />
          <Table.Column title="时间" dataIndex="time" align="center" />
          <Table.Column
            title="规则"
            dataIndex="rule"
            cell={this.renderTableRule}
            align="center"
          />
          <Table.Column title="创建者" dataIndex="creator" align="center" />
          <Table.Column
            title="操作"
            dataIndex="id"
            align="center"
            cell={this.renderTableCmd}
          />
        </Table>
      </div>
    );
  }
}

const styles = {
  table: {
    marginRight: '20px',
    marginTop: '20px',
  },
};
