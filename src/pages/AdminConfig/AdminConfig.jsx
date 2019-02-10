import { Input, Feedback, Button } from '@icedesign/base';
import { FormBinder, FormBinderWrapper } from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import React from 'react';
import axios from 'axios';
import './AdminConfig.scss';

export default class AdminConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jisuanke_update_interval: 3,
      codeforces_update_interval: 3,
      wait_time: 10,
      try_time: 10,
    };
  }

  componentDidMount() {
    axios
      .get('/api/admin/config')
      .then((r) => {
        this.setState({
          jisuanke_update_interval: r.data.jisuanke_update_interval / 3600,
          codeforces_update_interval: r.data.codeforces_update_interval / 3600,
          wait_time: r.data.wait_time,
          try_time: r.data.try_time,
        });
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('获取数据失败，请稍后重试');
      });
  }

  handleSubmit = () => {
    if (this.state.jisuanke_update_interval < 1) {
      Feedback.toast.prompt('计蒜客更新间隔需大于等于一小时');
      return;
    }
    if (this.state.codeforces_update_interval < 1) {
      Feedback.toast.prompt('Codeforces更新间隔需大于等于一小时');
      return;
    }
    if (this.state.wait_time < 1) {
      Feedback.toast.prompt('等待时间需大于等于一秒');
      return;
    }
    const data = {
      jisuanke_update_interval:
        Math.ceil(this.state.jisuanke_update_interval) * 3600,
      codeforces_update_interval:
        Math.ceil(this.state.codeforces_update_interval) * 3600,
      wait_time: Math.ceil(this.state.wait_time),
      try_time: Math.ceil(this.state.try_time),
    };
    axios
      .put('/api/admin/config', data)
      .then((r) => {
        Feedback.toast.success('设置成功');
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('提交失败，请稍后重试');
      });
  };

  render() {
    return (
      <div className="admin-config-container">
        <div className="admin-config-header">
          <div className="admin-config-title">基本设置</div>
        </div>
        <IceContainer className="config-container">
          <FormBinderWrapper value={this.state}>
            <div className="input-container">
              <span className="span">计蒜客比赛信息更新间隔</span>
              <FormBinder name="jisuanke_update_interval">
                <Input className="input" addonAfter="(时)" />
              </FormBinder>
              <span className="info-span">请设置为大于1小时，暂不支持小数</span>
            </div>
            <div className="input-container">
              <span className="span">Codeforces比赛信息更新间隔</span>
              <FormBinder name="codeforces_update_interval">
                <Input className="input" addonAfter="(时)" />
              </FormBinder>
              <span className="info-span">请设置为大于1小时，暂不支持小数</span>
            </div>
            <div className="input-container">
              <span className="span">爬虫获取信息失败重试次数</span>
              <FormBinder name="try_time">
                <Input className="input" addonAfter="(次)" />
              </FormBinder>
              <span className="info-span" />
            </div>
            <div className="input-container">
              <span className="span">爬虫重试重试时间间隔</span>
              <FormBinder name="wait_time">
                <Input className="input" addonAfter="(秒)" />
              </FormBinder>
              <span className="info-span" />
            </div>
            <div className="input-container">
              <span className="span">vj更新时间间隔</span>
              <Input
                defaultValue={24}
                readOnly
                disabled
                addonAfter="(时)"
                className="input"
              />
              <span className="info-span">暂时不支持修改此项</span>
            </div>
            <div className="input-container">
              <Button type="primary" onClick={this.handleSubmit}>
                提交
              </Button>
            </div>
          </FormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}
