/* eslint-disable react/jsx-no-bind */
import React from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button, Feedback } from '@icedesign/base';
import axios from 'axios';
import './ReviewUsers.scss';

export default class ReviewUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {
    this.setState({
      dataSource: this.props.data.map((item) => {
        return {
          ...item,
          cmd: {
            status: 0,
            id: item.id,
          },
        };
      }),
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: newProps.data.map((item) => {
        return {
          ...item,
          cmd: {
            status: 0,
            id: item.id,
          },
        };
      }),
    });
  }

  seedChange = (id, value) => {
    axios.put(`/api/admin/user/${id}`, {
      status: value,
    }).then(() => {
      this.setState({
        dataSource: this.state.dataSource.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              status: value,
              cmd: {
                status: value,
                id: item.id,
              },
            };
          }
          return item;
        }),
      });
    }).catch((e) => {
      console.log('error', e);
      Feedback.toast.error('网络错误，请稍后重试');
    });
  }

  handleReview = (id) => {
    this.seedChange(id, 1);
  };

  handleRollBack = (id) => {
    this.seedChange(id, 0);
  }

  renderTableCmd = (cmd) => {
    console.log('cmd', cmd);
    if (cmd.status === 1) {
      return <Button type="primary" onClick={this.handleRollBack.bind(this, cmd.id)} >已通过</Button>;
    }
    return (
      <Button onClick={this.handleReview.bind(this, cmd.id)}>审核通过</Button>
    );
  };

  renderTableVjudge = (vjid) => {
    return (
      <a
        href={`https://cn.vjudge.net/user/${vjid}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {vjid}
      </a>
    );
  };

  renderTableCodeforces = (codeforces) => {
    return (
      <a
        href={`http://codeforces.com/profile/${codeforces}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {codeforces}
      </a>
    );
  };

  renderTableBlog = (blog) => {
    return (
      <a href={blog} target="_blank" rel="noopener noreferrer">
        {blog}
      </a>
    );
  };

  render() {
    return (
      <div className="container">
        <div>
          <div className="page-header">
            <div className="page-title">待审核用户</div>
          </div>
          <hr />
          <IceContainer>
            <Table dataSource={this.state.dataSource}>
              <Table.Column title="姓名" dataIndex="name" width={180} />
              <Table.Column title="班级" dataIndex="banji" width={200} />
              <Table.Column title="用户名" dataIndex="username" width={180} />
              <Table.Column
                width={180}
                title="VJudge ID"
                dataIndex="vjid"
                cell={this.renderTableVjudge}
              />
              <Table.Column
                width={180}
                title="Codeforces"
                dataIndex="codeforces"
                cell={this.renderTableCodeforces}
              />
              <Table.Column
                title="博客"
                dataIndex="blog"
                cell={this.renderTableBlog}
              />
              <Table.Column
                width={180}
                align="center"
                title="操作"
                dataIndex="cmd"
                cell={this.renderTableCmd}
              />
            </Table>
          </IceContainer>
        </div>
      </div>
    );
  }
}
