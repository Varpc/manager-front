import React from 'react';
import { Dialog } from '@icedesign/base';

// 路由切换弹窗
export default class Comfirm extends React.Component {
  state = {
    visable: true,
  };

  onOK = () => {
    this.setState({
      visable: false,
    });
    this.props.callback(true);
  };

  onCancel = () => {
    this.setState({
      visable: false,
    });
    this.props.callback(false);
  };

  render() {
    return (
      <Dialog
        visable={this.state.visable}
        onOK={this.onOK}
        onCancel={this.onCancel}
      >
        <p>{this.props.message}</p>
      </Dialog>
    );
  }
}
