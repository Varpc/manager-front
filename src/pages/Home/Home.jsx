import React, { Component } from 'react';
import ImgSlider from './components/ImgSlider';
import Board from './components/Board';
import './Home.scss';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // axios.get('/api/problems').then((response) => {
    //   console.log(response.data);
    // });
  }

  render() {
    return (
      <div>
        <ImgSlider />
        <Board />
      </div>
    );
  }
}
