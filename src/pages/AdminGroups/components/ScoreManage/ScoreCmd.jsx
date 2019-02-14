import React from 'react';
import { Input, Button, Icon } from '@icedesign/base';

export default class Cmd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: '0',
    };
  }

  handleScoreChange = (value) => {
    this.setState({
      score: value,
    });
  };

  render() {
    const submit = this.props.submit;
    return (
      <div>
        <Input
          value={this.state.score}
          style={{ width: '50px' }}
          onChange={this.handleScoreChange}
        />
        <Button.Group style={{ marginLeft: '10px' }}>
          <Button
            type="primary"
            onClick={() => {
              submit(parseFloat(this.state.score), 'plus');
            }}
          >
            <Icon type="add" />
          </Button>
          <Button
            type="secondary"
            onClick={() => {
              submit(parseFloat(this.state.score), 'minus');
            }}
          >
            <Icon type="minus" />
          </Button>
        </Button.Group>
      </div>
    );
  }
}
