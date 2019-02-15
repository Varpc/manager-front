import React from 'react';
import { Dialog, Button } from '@icedesign/base';

export default class RuleWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleChangevisible = () => {
    this.setState({
      visible: !this.state.visible,
    });
    console.log('visible', this.state.visible);
  };

  render() {
    const footer = <Button onClick={this.handleChangevisible}>关闭</Button>;
    return (
      <div>
        <Button onClick={this.handleChangevisible}>显示规则</Button>
        <Dialog
          style={{ width: '1000px' }}
          visible={this.state.visible}
          footer={footer}
          onClose={this.handleChangevisible}
        >
          <h1>Hello world</h1>
          {/* <div dangerouslySetInnerHTML={{ __html: this.props.rule }} /> */}
        </Dialog>
      </div>
    );
  }
}
