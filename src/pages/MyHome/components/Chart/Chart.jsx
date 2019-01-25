import IceContainer from '@icedesign/container';
import { Feedback } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import BarChart from './BarChart';
import './Chart.scss';
import LineChart from './LineChart';
import PieDountChart from './PieDountChart';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id,
      problemstData: [],
      lastDaysData: [],
    };
  }

  componentWillReceiveProps(newProps) {
    this.state.userId = newProps.match.params.id;
    this.componentDidMount();
  }

  componentDidMount() {
    axios
      .get(`/api/problem/${this.state.userId}`)
      .then((r) => {
        const data = r.data;
        console.log(data);
        const ansProblems = [];
        ansProblems.push({ oj: '蓝书', sum: data.blue_book });
        ansProblems.push({ oj: '紫书', sum: data.purple_book });
        ansProblems.push({ oj: 'uva', sum: data.uva });
        ansProblems.push({ oj: 'poj', sum: data.poj });
        ansProblems.push({ oj: 'hdu', sum: data.hdu });
        const date = new Date();
        date.setTime(date.setDate(date.getDate() - 31));
        const ansLastDays = data.last_days.map((v, index) => {
          date.setTime(date.setDate(date.getDate() + 1));
          return {
            date: date.toDateString(),
            sum: v,
            index,
          };
        });
        this.setState({
          problemstData: ansProblems,
          lastDaysData: ansLastDays,
        });
      })
      .catch((e) => {
        console.log(e);
        Feedback.toast.error('数据获取失败');
      });
  }

  render() {
    return (
      <div>
        {/* 图表组件均用的BizCharts库，代码均来自示例，具体用法不明，详见:https://bizcharts.net/index */}
        <div className="chart-container">
          <IceContainer className="line-chart-container">
            <div>
              <div style={{ marginBottom: '10px' }}>近30天刷题统计</div>
              <LineChart dataSource={this.state.lastDaysData} />
            </div>
          </IceContainer>
        </div>
        <div className="chart-container" style={{ marginTop: '0' }}>
          <IceContainer className="charts-container">
            <PieDountChart dataSource={this.state.problemstData} />
            <BarChart dataSource={this.state.problemstData} />
          </IceContainer>
        </div>
      </div>
    );
  }
}
