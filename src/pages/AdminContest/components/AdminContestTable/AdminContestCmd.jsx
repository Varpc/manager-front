import { Button, Dialog, Feedback } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import AdminContestEdit from '../AdminContestEdit';
import './AdminContestCmd.scss';

export default class AdminContestCmd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      visible: false,
      data: this.props.data,
    };
  }

  handleOnEditClick = () => {
    this.setState({
      visible: true,
    });
  };

  handleOnEditWindowClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleOnDeleteClick = () => {
    const id = this.state.id;
    Dialog.alert({
      title: '警告',
      content: '真的要删除吗？',
      onOk: () => {
        axios.delete(`/api/admin/contestseason/${id}`).then(() => {
          this.props.onDelete(id);
          Feedback.toast.success('删除成功');
        }).catch((e) => {
          console.log('error', e);
          Feedback.toast.error('网络错误，请稍后重试');
        });
      },
    });
  };

  handleOnSubmit = (data) => {
    const id = this.state.id;
    data.id = id;
    axios
      .put(`/api/admin/contestseason/${id}`, {
        ...data,
      })
      .then(() => {
        this.props.onEdit(id, data);
        Feedback.toast.success('修改成功，刷新后显示');
      })
      .catch((e) => {
        console.log('error', e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  };

  render() {
    return (
      <div className="cmd">
        <Button
          type="primary"
          onClick={this.handleOnEditClick}
          className="button"
        >
          编辑
        </Button>
        <Button
          type="normal"
          shape="warning"
          onClick={this.handleOnDeleteClick}
          className="button"
        >
          删除
        </Button>
        <Dialog
          visible={this.state.visible}
          title="编辑"
          footer={false}
          onClose={this.handleOnEditWindowClose}
        >
          <AdminContestEdit
            onSubmit={this.handleOnSubmit}
            data={this.state.data}
          />
        </Dialog>
      </div>
    );
  }
}
