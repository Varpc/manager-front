import React from 'react';
import IceContainer from '@icedesign/container';
import JiSuanKeTable from './components/JiSuanKeTable';
import CodeforcesTable from './components/CodeforcesTable';
import './RecentContest.scss';

export default class RecentContest extends React.Component {
  render() {
    return (
      <div>
        <div className="container page-title">近期各大OJ比赛统计</div>
        <IceContainer className="container">
          <JiSuanKeTable />
        </IceContainer>
        <IceContainer className="container">
          <CodeforcesTable />
        </IceContainer>
        <IceContainer className="container" style={{ justifyContent: 'center' }} >
          更多OJ敬请期待
        </IceContainer>
      </div>
    );
  }
}
