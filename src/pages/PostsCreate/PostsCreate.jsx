import React from 'react';
import { connect } from 'react-redux';
import {
  mapUserReducerToProps,
  mapUserStateToProps,
} from '../../utils/userRedux/mapToPrpos';
import './PostsCreate.scss';

@connect(
  mapUserStateToProps,
  mapUserReducerToProps
)
export default class PostsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <h1>创建文章</h1>;
  }
}
