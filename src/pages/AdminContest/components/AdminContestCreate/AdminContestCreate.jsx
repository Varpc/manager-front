import { Feedback } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import AdminContestEdit from '../AdminContestEdit';
import './AdminContestCreate.scss';


export default class AdminContestCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnSubmit = (data) => {
    axios.post('/api/admin/contestseason', {
      name: data.name,
      rule: data.rule,
      beginTime: data.beginTime,
      endTime: data.endTime,
    }).then(() => {
      Feedback.toast.success('创建成功');
    }).catch((e) => {
      console.log('error', e);
      Feedback.toast.error('网络错误，请稍后重试');
    });
  };

  render() {
    return (
      <div className="admin-contest-create-container">
        <div className="page-header">
          <div className="page-title">新建赛季</div>
        </div>
        <AdminContestEdit onSubmit={this.handleOnSubmit} />
      </div>
    );
  }
}
