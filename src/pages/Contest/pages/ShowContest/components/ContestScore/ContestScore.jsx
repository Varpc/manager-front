import React from 'react';
import { Table } from '@icedesign/base';
import './ContestScore.scss';

export default class ContestScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentWillMount() {
    this.setState({
      dataSource: getData,
    });
  }

  render() {
    return (
      <div className="contest-score-container" >
        <Table
          dataSource={this.state.dataSource}
          className="contest-score-table"
        >
          <Table.Column title="排名" dataIndex="rank" align="center" width={60} />
          <Table.Column title="名称" dataIndex="name" align="center" />
          <Table.Column title="本场得分" dataIndex="score" align="center" />
          <Table.Column title="总得分" dataIndex="scoreSum" align="center" />
        </Table>
      </div>
    );
  }
}

const getData = [
  {
    rank: 1,
    name: '小明',
    score: 1,
    scoreSum: 34,
  },
  {
    rank: 1,
    name: '小明',
    score: 1,
    scoreSum: 34,
  },
  {
    rank: 1,
    name: '小明',
    score: 1,
    scoreSum: 34,
  },
  {
    rank: 1,
    name: '小明',
    score: 1,
    scoreSum: 34,
  },
]