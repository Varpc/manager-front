import React from 'react';
import { Table } from '@icedesign/base';
import './ContestRank.scss';

/**
 * 该组件用于生成ac排行榜,后端直接返回vj排行榜的json数据即可，该组件内部会进行解析
 * todo: 现在每道题罚时暂定为20分钟，以后要进行更改
 * todo: 想在所有的题目暂定为10道，以后要想办法获取
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
      problemsLength: 11,
    };
  }

  fromData = (data) => {
    const perPenalty = 20 * 60; // 这里先假设每道题罚时20分钟
    const contestLength = data.length / 1000;
    const participants = data.participants;
    const submissions = data.submissions.filter(
      item => item[3] <= contestLength
    );
    // 获取有多少题目
    const problemsLength = 10; // 暂定为10道

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
    console.log(dataSource);
    console.log('vis', vis);
    const hadAC = {}; // 用来记录一血题目
    for (let i = 0; i < submissions.length; i += 1) {
      const no = submissions[i][0];
      const ind = vis[no]; // 得到提交该题的队伍在dataSource中的下标
      const prob = submissions[i][1];
      if (dataSource[ind].problems[prob].length === 0) {
        dataSource[ind].problems[prob].push(0);
        dataSource[ind].problems[prob].push(0);
        dataSource[ind].problems[prob].push(0);
      }
      if (dataSource[ind].problems[prob][1] !== 0) { // 题目已过
        // eslint-disable-next-line no-continue
        continue;
      }
      dataSource[ind].problems[prob][0] = submissions[i][3];
      dataSource[ind].problems[prob][1] = submissions[i][2];
      dataSource[ind].problems[prob][2] += submissions[i][2] - 1; // 当前提交过了加0，不过加-1
      if (dataSource[ind].problems[prob][1] !== 0) {
        dataSource[ind].score += 1; // 题目过了，分数加一
        // eslint-disable-next-line no-mixed-operators
        dataSource[ind].penalty += perPenalty * (-dataSource[ind].problems[prob][2]) + dataSource[ind].problems[prob][0]; // 加罚时
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

    return [dataSource, problemsLength];
  };
  componentWillMount() {
    const dataArray = this.fromData(data);
    this.setState({
      dataSource: dataArray[0],
      problemsLength: dataArray[1],
    });
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

const data = {
  id: 269577,
  title: 'SDKD 2018 Summer Team Contest XXVI',
  begin: 1541899800000,
  length: 18000000,
  isReplay: false,
  participants: {
    75215: ['NCC_1895', 'Endeavour'],
    97727: ['NCC_26517', 'Excalibur'],
    97775: ['NCC_31347', 'Trident'],
    119260: ['201601060802', '韩冰'],
    139792: ['NCC_9754_', 'Victory'],
    139800: ['NCC_2893_', 'Stargazer'],
    139801: ['NCC_63549', 'Thunderchild'],
    158310: ['NCC_74656', 'Voyager'],
    161401: ['Primer', '范家铭'],
    170128: ['sunmaoxiang', '孙茂翔'],
    170479: ['201701060314', 'juruo ltx'],
    170626: ['wx13954861934', '王鑫'],
    170706: ['Varpc', '刘鸣亮'],
    171419: ['J13', 'LS'],
    172277: ['1044728100', '臭猪'],
    174561: ['Vici__', '刘燚'],
    175284: ['fuifd2', '赵业发'],
    182250: ['QAQ233', '公卫钢'],
    202893: ['NCC_50446_', 'CrazyHorse'],
    202899: ['NCC_73515_', 'Nova'],
    202900: ['NCC_62497_', 'Akira'],
    202901: ['NCC_32450_', 'Raven'],
    202919: ['NCC_2590_B', 'Valkyrie'],
    202924: ['NCC_2000_A', 'Excelsior'],
    203016: ['NCC_70611_', 'Cheyenne'],
    223766: ['__zz', 'ruinsin'],
    228223: ['pyqjw', 'soybeanmilk'],
    243667: ['Gavin_Nicholas', 'Gavin'],
  },
  submissions: [
    [243667, 0, 0, 993],
    [139792, 0, 0, 1332],
    [202900, 0, 0, 1702],
    [228223, 0, 0, 1725],
    [228223, 0, 0, 2051],
    [203016, 2, 0, 2536],
    [243667, 0, 0, 2900],
    [202900, 2, 0, 3383],
    [158310, 2, 0, 4318],
    [203016, 2, 0, 4408],
    [75215, 2, 0, 4803],
    [223766, 0, 0, 4853],
    [158310, 2, 0, 5065],
    [202893, 2, 1, 5518],
    [75215, 2, 0, 5864],
    [97775, 2, 0, 5871],
    [202900, 2, 0, 6191],
    [139801, 2, 1, 6633],
    [228223, 0, 0, 6888],
    [202924, 6, 0, 6952],
    [97775, 2, 0, 7001],
    [228223, 0, 0, 7152],
    [139792, 2, 0, 7410],
    [158310, 2, 0, 7963],
    [202893, 0, 0, 8128],
    [97727, 2, 1, 8144],
    [139800, 6, 0, 8795],
    [139800, 0, 0, 8866],
    [139792, 4, 0, 9388],
    [139792, 2, 0, 9464],
    [202924, 2, 0, 9492],
    [202893, 6, 1, 9756],
    [202899, 2, 0, 9916],
    [202899, 2, 0, 9916],
    [97775, 2, 0, 9955],
    [158310, 2, 0, 10047],
    [203016, 2, 0, 10084],
    [202899, 2, 0, 10252],
    [202899, 2, 0, 10477],
    [158310, 2, 0, 10926],
    [203016, 6, 1, 11041],
    [139792, 2, 0, 11225],
    [158310, 2, 0, 11402],
    [202900, 2, 1, 11546],
    [97775, 0, 0, 11557],
    [139800, 0, 0, 11767],
    [202899, 2, 0, 12550],
    [139792, 2, 1, 12575],
    [228223, 2, 0, 12851],
    [75215, 2, 0, 12974],
    [158310, 6, 1, 13030],
    [97727, 0, 0, 13324],
    [202900, 6, 0, 13361],
    [228223, 2, 0, 13364],
    [202900, 6, 1, 13554],
    [139801, 6, 0, 13834],
    [202924, 2, 0, 13903],
    [158310, 2, 0, 14341],
    [202924, 2, 0, 14451],
    [97775, 2, 0, 14493],
    [75215, 2, 0, 14579],
    [139800, 6, 0, 14669],
    [139800, 6, 0, 14795],
    [139801, 6, 1, 14934],
    [202919, 2, 0, 14980],
    [228223, 2, 0, 15022],
    [202899, 2, 0, 15059],
    [75215, 2, 0, 15189],
    [228223, 2, 0, 15279],
    [228223, 2, 0, 15428],
    [202919, 2, 1, 15537],
    [139792, 6, 0, 15549],
    [158310, 2, 1, 15591],
    [75215, 2, 0, 15680],
    [202899, 2, 0, 15725],
    [202924, 2, 0, 15797],
    [75215, 2, 0, 15814],
    [202893, 0, 0, 15994],
    [202924, 2, 0, 16176],
    [75215, 2, 0, 16424],
    [228223, 2, 0, 16441],
    [202899, 2, 0, 16689],
    [202899, 6, 0, 16984],
    [202899, 6, 1, 17069],
    [97775, 2, 0, 17453],
    [97775, 6, 0, 17796],
    [139792, 6, 0, 17953],
    [97775, 2, 0, 17957],
    [202924, 2, 0, 17960],
    [139792, 6, 0, 17999],
    [139800, 6, 0, 18003],
    [97775, 2, 1, 18232],
    [202901, 6, 1, 18817],
    [202900, 9, 0, 27486],
    [202900, 9, 0, 27540],
    [170128, 2, 1, 35724],
    [170626, 6, 0, 36320],
    [170626, 6, 1, 36445],
    [172277, 2, 1, 103710],
    [172277, 6, 1, 105013],
    [170128, 6, 1, 112436],
    [170626, 0, 0, 112520],
    [170626, 0, 1, 113262],
    [75215, 2, 1, 113265],
    [171419, 2, 1, 113407],
    [171419, 6, 1, 116970],
    [119260, 0, 0, 131384],
    [119260, 0, 0, 131992],
    [119260, 0, 0, 132347],
    [119260, 0, 0, 132687],
    [119260, 0, 0, 133038],
    [119260, 0, 1, 133527],
    [170706, 2, 1, 173594],
    [175284, 6, 1, 459604],
    [172277, 0, 0, 465558],
    [172277, 0, 1, 468361],
    [170479, 3, 0, 1001828],
    [170479, 3, 0, 1002515],
    [170479, 3, 0, 1002981],
    [170479, 3, 1, 1003143],
    [170128, 0, 0, 1143271],
    [170128, 0, 0, 1144872],
    [170128, 0, 0, 1159665],
    [170128, 0, 0, 1159915],
    [170128, 0, 0, 1163329],
    [170128, 0, 0, 1163386],
    [170128, 0, 1, 1163451],
    [182250, 6, 1, 1649782],
    [139800, 2, 0, 5889324],
    [139800, 2, 0, 5890300],
    [139800, 2, 1, 5890445],
    [139800, 6, 1, 5904198],
    [161401, 6, 1, 5967428],
    [182250, 0, 1, 6228235],
    [174561, 6, 0, 6433068],
    [174561, 6, 0, 6433104],
    [174561, 6, 1, 6433335],
    [174561, 2, 0, 6440077],
    [174561, 2, 0, 6440125],
    [174561, 2, 1, 6440236],
    [161401, 2, 1, 6519760],
    [161401, 0, 0, 6696401],
    [161401, 0, 1, 6696468],
  ],
};
