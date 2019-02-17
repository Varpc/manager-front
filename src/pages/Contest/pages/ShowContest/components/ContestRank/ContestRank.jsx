/* eslint-disable no-mixed-operators */
/* eslint-disable no-continue */
import React from 'react';
import { Table, Notice } from '@icedesign/base';
import './ContestRank.scss';

/**
 * 该组件用于生成ac排行榜,后端直接返回vj排行榜的json数据即可，该组件内部会进行解析
 * todo: 该组件对数据的格式很严格，耦合性太高，对数据的校验也不好，对于不合法的数据
 * 无法给出人性化的提示，以后需要加以修改，需要解决的：
 *  1）如果后端给出的数据中题目的数量不正确，这可能会在数据格式化的时候出错，这里只
 *     是简单的进行了判断，不渲染出错的数据
 *
 * @param problemSum (Integer) 题目的数量
 * @param penalty (Integer) 每错一道题的罚时
 * @param data (string) vj上榜单的json格式字符串
 *
 * 所解析成的数据格式，即dataSource的格式：
 * dataSource = [
 *  {
 *    rank: 1, //排行
 *    name: 'NCC_63549 (Thunderchild)', // 队伍名称
 *    score: 3, // ac题目数量
 *    penalty: 586, //罚时
 *    problems: [[255, 1, 0], [], [], [], [], [255, 1, -5], [], [], [255, 1, 0]],
 *    // problems的长度为该场比赛题目的数量，[]元素表示该题没做, 否则应以[罚时， 是否ac（0为错误，1为ac，2为一血），错误的次数]格式给出
 *  },
 * ]
 */
export default class ContestRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      problemsLength: 10,
      info: false, // 是否显示出错信息
    };
  }

  fromData = (data, problemSum, penalty) => {
    const perPenalty = penalty * 60; // penalty单位为分钟，转化为秒
    const contestLength = data.length / 1000; // data.length单位为毫秒，转换为秒
    const participants = data.participants;
    const submissions = data.submissions.filter(
      item => item[3] <= contestLength
    );
    // 获取有多少题目
    const problemsLength = problemSum;
    // 获取参加的队伍
    const dataSource = [];
    const vis = {};
    for (let i = 0; i < submissions.length; i += 1) {
      const no = submissions[i][0];
      // eslint-disable-next-line no-continue
      if (vis[no] !== null && vis[no] !== undefined) continue;
      vis[no] = dataSource.length; // 记录在dataSource中的下标，方便后面的更改
      const item = {};
      const nameArray = participants[no];
      item.name = `${nameArray[0]} ${nameArray[1]}`;
      item.score = 0;
      item.penalty = 0;
      item.problems = [];
      for (let j = 0; j < problemsLength; j += 1) {
        item.problems.push([]);
      }
      dataSource.push(item);
    }

    const hadAC = {}; // 用来记录一血题目
    for (let i = 0; i < submissions.length; i += 1) {
      const no = submissions[i][0];
      const ind = vis[no]; // 得到提交该题的队伍在dataSource中的下标
      const prob = submissions[i][1];

      if (!dataSource[ind].problems[prob]) continue; // 这里用于避免最上层注释中的第一种情况

      if (dataSource[ind].problems[prob].length === 0) {
        dataSource[ind].problems[prob].push(0);
        dataSource[ind].problems[prob].push(0);
        dataSource[ind].problems[prob].push(0);
      }
      if (dataSource[ind].problems[prob][1] !== 0) {
        // 题目已过
        // eslint-disable-next-line no-continue
        continue;
      }
      dataSource[ind].problems[prob][0] = submissions[i][3];
      dataSource[ind].problems[prob][1] = submissions[i][2];
      dataSource[ind].problems[prob][2] += submissions[i][2] - 1; // 当前提交过了加0，不过加-1
      if (dataSource[ind].problems[prob][1] !== 0) {
        dataSource[ind].score += 1; // 题目过了，分数加一
        // eslint-disable-next-line no-mixed-operators
        dataSource[ind].penalty +=
          perPenalty * -dataSource[ind].problems[prob][2] +
          dataSource[ind].problems[prob][0]; // 加罚时
        // 判断是否是一血
        if (hadAC[prob] === null || hadAC[prob] === undefined) {
          hadAC[prob] = 1;
          dataSource[ind].problems[prob][1] = 2; // 一血
        }
      }
    }

    dataSource.sort((a, b) => {
      if (a.score === b.score) return a.penalty - b.penalty;
      return b.score - a.score;
    });
    for (let i = 0; i < dataSource.length; i += 1) {
      dataSource[i].rank = i + 1;
    }
    // console.log('dataSource', dataSource);

    return dataSource;
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.data || !newProps.problemSum || !newProps.penalty) return;
    try {
      const data = JSON.parse(newProps.data);
      const problemSum = newProps.problemSum;
      const penalty = newProps.penalty;
      const dataSource = this.fromData(data, problemSum, penalty);
      this.setState({
        dataSource,
        problemsLength: problemSum,
      });
    } catch (e) {
      this.setState({
        info: true,
      });
    }
  }

  componentWillMount() {
    if (!this.props.data || !this.props.problemSum || !this.props.penalty) {
      return;
    }
    try {
      const data = JSON.parse(this.props.data);
      const problemSum = this.props.problemSum;
      const penalty = this.props.penalty;
      const dataSource = this.fromData(data, problemSum, penalty);
      this.setState({
        dataSource,
        problemsLength: problemSum,
      });
    } catch (e) {
      this.setState({
        info: true,
      });
    }
  }

  // 格式化时间：将秒改成时分秒的格式
  formatSeconds = (result) => {
    const h =
      Math.floor(result / 3600) < 10
        ? `0${Math.floor(result / 3600)}`
        : Math.floor(result / 3600);
    const m =
      Math.floor((result / 60) % 60) < 10
        ? `0${Math.floor((result / 60) % 60)}`
        : Math.floor((result / 60) % 60);
    const s =
      Math.floor(result % 60) < 10
        ? `0${Math.floor(result % 60)}`
        : Math.floor(result % 60);
    return (result = `${h}:${m}:${s}`);
  };

  renderTableProblem = (problem) => {
    if (problem.length === 3) {
      if (problem[1] === 1) {
        return (
          <div className="rank-problem-item-green">
            <div className="time">
              {this.formatSeconds(problem[0])} ({problem[2]})
            </div>
          </div>
        );
      } else if (problem[1] === 2) {
        return (
          <div className="rank-problem-item-blue">
            <div className="time">
              {this.formatSeconds(problem[0])} ({problem[2]})
            </div>
          </div>
        );
      }
      return (
        <div className="rank-problem-item-red">
          <div className="time">({problem[2]})</div>
        </div>
      );
    }
    return <div className="rank-problem-item-write" />;
  };

  renderProblemsItem = () => {
    const item = [];
    for (let i = 0; i < this.state.problemsLength; i += 1) {
      console.log(i);
      const di = `problems[${i}]`;
      item.push(
        <Table.Column
          key={di}
          title={String.fromCharCode(65 + i)}
          dataIndex={di}
          cell={this.renderTableProblem}
          align="center"
        />
      );
    }
    return item;
  };

  renderTablePenalty = (value) => {
    return <div>{this.formatSeconds(value)}</div>;
  };

  render() {
    return (
      <div>
        {this.state.info && (
          <Notice
            title="出错咯.由于数据的错误，导致无法渲染，修复请联系管理员"
            type="warning"
            style={{ marginTop: '10px' }}
          />
        )}
        <Table dataSource={this.state.dataSource} className="rank-table">
          <Table.Column
            title="排名"
            dataIndex="rank"
            width={60}
            align="center"
          />
          <Table.Column
            title="名称"
            dataIndex="name"
            width={200}
            align="center"
          />
          <Table.Column title="分数" dataIndex="score" align="center" />
          <Table.Column
            title="罚时"
            dataIndex="penalty"
            align="center"
            cell={this.renderTablePenalty}
          />
          {this.renderProblemsItem()}
        </Table>
      </div>
    );
  }
}
