import { Feedback, Table, Button, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import ScoreCmd from './ScoreCmd';
import './ScoreManage.scss';

export default class ScoreManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get('/api/groups')
      .then((r) => {
        this.setState({
          dataSource: r.data.data,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.log(e);
        Feedback.toast.error('网络错误');
        this.setState({
          isLoading: false,
        });
      });
  }

  renderTableUser = (users) => {
    return users.map((user) => {
      return (
        <Link to={`/myhome/${user.id}`} key={user.id}>
          {user.name}&nbsp;
        </Link>
      );
    });
  };

  handleScoreClear = () => {
    Dialog.alert({
      content: '真的要全部清零吗？',
      title: '警告',
      onOk: () => {
        this.setState({
          dataSource: this.state.dataSource.map((item) => {
            return { ...item, score: 0 };
          }),
        });
      },
    });
  };

  renderTableCmd = (id) => {
    /**
     * 提交分数修改
     * @param id (Number) 队伍id
     * @param num (Number) 分数
     * @param type (String "plus" or "minus") 减分还是加分
     */
    const submit = (num, type) => {
      // axios
      //   .put(`/${id}`, { num, type })
      //   .then(() => {
      //     this.setState({
      //       dataSource: this.state.dataSource.map((item) => {
      //         if (item.group_id === id) {
      //           if (type === 'plus') {
      //             return { ...item, score: item.score + num };
      //           } else if (type === 'minus') {
      //             return { ...item, score: item.score - num };
      //           }
      //         }
      //         return item;
      //       }),
      //     });
      //   })
      //   .catch((e) => {
      //     Feedback.toast.error('提交失败，请稍后重试');
      //     console.log('error', e);
      //   });

      /** 以下用于测试 */
      this.setState({
        dataSource: this.state.dataSource.map((item) => {
          if (item.group_id === id) {
            if (type === 'plus') {
              return { ...item, score: item.score + num };
            } else if (type === 'minus') {
              return { ...item, score: item.score - num };
            }
          }
          return item;
        }),
      });
    };
    /** ************* */
    return <ScoreCmd submit={submit} />;
  };

  render() {
    return (
      <div className="container">
        <div>
          <div className="page-header">
            <div className="page-title">分数管理</div>
            <Button
              type="normal"
              shape="warning"
              style={{ marginRight: '30px' }}
              onClick={this.handleScoreClear}
            >
              分数清零
            </Button>
          </div>
          <hr />
          <IceContainer>
            <Table
              dataSource={this.state.dataSource}
              isLoading={this.state.isLoading}
            >
              <Table.Column title="名称" dataIndex="name" />
              <Table.Column title="编号" dataIndex="no" />
              <Table.Column
                title="队员"
                dataIndex="user"
                cell={this.renderTableUser}
              />
              <Table.Column title="当前分数" dataIndex="score" sortable />
              <Table.Column
                align="center"
                title="分数操作"
                dataIndex="group_id"
                cell={this.renderTableCmd}
              />
            </Table>
          </IceContainer>
        </div>
      </div>
    );
  }
}
