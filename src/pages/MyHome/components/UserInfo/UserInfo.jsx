import React from 'react';
import axios from 'axios';
import { Feedback } from '@icedesign/base';
import Img from '@icedesign/img';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  mapUserReducerToProps,
  mapUserStateToProps,
} from '../../../../utils/userRedux/mapToPrpos';
import './UserInfo.scss';

@connect(
  mapUserStateToProps,
  mapUserReducerToProps
)
@withRouter
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      image: '',
      name: '',
      banji: '',
      blog: '',
    };
  }

  componentWillReceiveProps(newProps) {
    this.state.userId = newProps.match.params.id;
    this.componentDidMount();
    // const id = newProps.userId;
    // this.setState({
    //   userId: id,
    // });
    // axios
    //   .get(`/api/user/${id}`)
    //   .then((r) => {
    //     this.setState({
    //       image: r.data.image,
    //       name: r.data.name,
    //       banji: r.data.banji,
    //       blog: r.data.blog,
    //       status: r.data.status,
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     Feedback.toast.error('加载失败');
    //   });
  }

  componentDidMount() {
    axios
      .get(`/api/user/${this.state.userId}`)
      .then((r) => {
        this.setState({
          image: r.data.image,
          name: r.data.name,
          banji: r.data.banji,
          blog: r.data.blog,
          status: r.data.status,
        });
      })
      .catch((e) => {
        console.log(e);
        Feedback.toast.error('加载失败');
      });
  }

  handleOnClick = () => {
    this.props.history.push('#');
  };

  renderStatus = () => {
    const status = this.state.status;
    if (status === 0) {
      return (
        <div className="status-blue">
          <div className="status-blue-text">审核</div>
        </div>
      );
    }
    if (status === 1) {
      return (
        <div className="status-green">
          <div className="status-green-text">现役</div>
        </div>
      );
    }
    if (status === 2) {
      return (
        <div className="status-blue">
          <div className="status-blue-text">退役</div>
        </div>
      );
    }
    if (status === 3) {
      return (
        <div className="status-red">
          <div className="status-red-text">除名</div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="userinfo-container">
        <div className="content">
          <div className="content-header" />
          <div className="content-user">
            <Img
              src={this.state.image}
              className="content-head-img"
              width={150}
              height={150}
            />
            <div className="content-user-info">
              <div>
                <div>
                  <h1>{this.state.name}</h1>
                  {this.renderStatus()}
                </div>
                <h3>{this.state.banji}</h3>
                {this.state.blog && (
                  <div>
                    我的博客:
                    <a href={this.state.blog} target="__blank">
                      {this.state.blog}
                    </a>
                  </div>
                )}
              </div>
              <div className="content-user-button">
                {String(this.props.user.id) === String(this.state.userId) && (
                  <button
                    type="button"
                    className="content-user-button-style"
                    onClick={this.handleOnClick}
                  >
                    编辑个人资料
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
