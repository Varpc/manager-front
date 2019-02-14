import React from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button, Dialog } from '@icedesign/base';
import './QuitUsers.scss';

export default class QuitUsers extends React.Component {
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

  handleReview = (id) => {
    this.setState({
      dataSource: this.state.dataSource.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 1,
            cmd: {
              status: 1,
              id: item.id,
            },
          };
        }
        return item;
      }),
    });
  };

  handleToDelete = (id) => {
    /** todo: axios */
    Dialog.alert({
      title: '警告',
      content: '注意，操作不可逆！真的要删除吗？',
      onOk: () => {
        this.props.onDelete(id);
      },
    });
  };

  renderTableCmd = (cmd) => {
    return (
      // eslint-disable-next-line react/jsx-no-bind
      <Button type="normal" shape="warning" onClick={this.handleToDelete.bind(this, cmd.id)}>删除</Button>
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
