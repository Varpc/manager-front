/* eslint-disable react/jsx-no-bind */
import { Grid, Icon, Pagination, Dialog, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  mapUserStateToProps,
  mapUserReducerToProps,
} from '../../../../utils/userRedux/mapToPrpos';
import './Lists.scss';

const { Row, Col } = Grid;

@connect(
  mapUserStateToProps,
  mapUserReducerToProps
)
@withRouter
export default class Lists extends Component {
  static displayName = 'Lists';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      dataSource: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/posts')
      .then((r) => {
        this.setState({
          dataSource: r.data.data,
        });
        this.props.onTitleClick(r.data.data[0].post_id);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  handlePageSizeChange = (size) => {
    this.setState({
      pageSize: size,
    });
  };

  handleDeletePost = (value) => {
    const url = `/api/admin/post/${value}`;
    Dialog.confirm({
      content: '真的要删除吗？',
      onOk: () => {
        axios
          .delete(url)
          .then(() => {
            const ind = this.state.dataSource.findIndex(
              item => item.post_id === value
            );
            if (ind !== -1) {
              this.state.dataSource.splice(ind, 1);
              this.setState({
                dataSource: this.state.dataSource,
              });
              Feedback.toast.success('删除成功');
              return;
            }
            Feedback.toast.error('删除失败');
          })
          .catch((e) => {
            console.log(e);
            Feedback.toast.error('删除失败');
          });
      },
    });
  };

  handleNeedEdit = (postId) => {
    axios
      .put(`/api/admin/post/${postId}`)
      .then(() => {
        this.setState({
          dataSource: this.state.dataSource.map((item) => {
            if (item.post_id === postId) {
              return {
                ...item,
                need_edit: true,
              };
            }
            return item;
          }),
        });
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  };

  handleShowPost = (postId) => {
    this.props.onTitleClick(postId);
  };

  render() {
    const { dataSource } = this.state;
    const from = (this.state.current - 1) * this.state.pageSize;
    const to = this.state.current * this.state.pageSize;
    const data = [];
    for (let i = from; i < to && i < dataSource.length; i += 1) {
      data.push(dataSource[i]);
    }
    return (
      <IceContainer style={{ marginTop: '15px' }}>
        <div style={styles.contentList}>
          {data.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <Row>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleShowPost.bind(this, item.post_id)}
                  >
                    <h5 style={styles.title}>{`  ${item.title}`}</h5>
                  </a>
                  {item.need_edit && (
                    <div className="list-red">
                      <div className="list-red-text">需要修改</div>
                    </div>
                  )}
                </Row>
                <Row>
                  <Col l="16">
                    <div style={styles.metaWrap}>
                      <div style={styles.meta}>
                        <span>作者: </span>
                        <span>
                          <Link to={`/myhome/${item.user_id}`}>
                            {item.author}
                          </Link>
                        </span>
                      </div>
                      <div style={styles.meta}>
                        <span>时间: </span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </Col>
                  <Col l="8">
                    <div style={styles.operWrap}>
                      <div
                        style={styles.oper}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={this.handleNeedEdit.bind(this, item.post_id)}
                      >
                        <Icon size="xs" type="edit" style={styles.operIcon} />
                        <span style={styles.operText}>需要修改</span>
                      </div>

                      <div
                        style={styles.oper}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={this.handleDeletePost.bind(this, item.post_id)}
                      >
                        <Icon size="xs" type="ashbin" style={styles.operIcon} />
                        <span style={styles.operText}>删除</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
        <Pagination
          style={styles.pagination}
          shape="arrow-only"
          current={this.state.current}
          onChange={this.handlePaginationChange}
          total={this.state.dataSource.length}
          pageSize={this.state.pageSize}
          pageSizeSelector="dropdown"
          pageSizePosition="start"
          onPageSizeChange={this.handlePageSizeChange}
          pageSizeList={[10, 15, 20]}
        />
      </IceContainer>
    );
  }
}

const styles = {
  cardTitle: {
    height: '16px',
    lineHeight: '16px',
    fontSize: '16px',
    color: 'rgb(51, 51, 51)',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
  },
  item: {
    position: 'relative',
    borderBottom: '1px solid #eee',
    padding: '20px 0',
  },
  title: {
    margin: '0 0 10px',
    color: '#5485F7',
  },
  metaWrap: {
    display: 'flex',
    paddingLeft: '15px',
  },
  meta: {
    fontSize: '13px',
    color: '#999',
    marginRight: '15px',
  },
  operWrap: {
    position: 'absolute',
    right: '0',
    top: '36px',
    display: 'flex',
    cursor: 'pointer',
  },
  oper: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#999',
  },
  operIcon: {
    marginRight: '8px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
};
