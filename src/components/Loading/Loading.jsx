import React from 'react';
import { Loading as IceLoading } from '@icedesign/base';
import './Loading.scss';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="my-loading-container">
        <IceLoading shape="dot-circle" color="#333" />
      </div>
    );
  }
}
