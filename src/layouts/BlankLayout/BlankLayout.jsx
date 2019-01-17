import React from 'react';
import Layout from '@icedesign/layout';
import './BlankLayout.scss';

export default class BlankLayout extends React.Component {
  render() {
    return (
      <Layout className="blank-layout">
        <div>{this.props.children}</div>
      </Layout>
    );
  }
}
