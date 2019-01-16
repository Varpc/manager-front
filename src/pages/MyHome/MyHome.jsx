import React from 'react';

export default class MyHome extends React.Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        <h1>Hello World{id}</h1>
      </div>
    );
  }
}
