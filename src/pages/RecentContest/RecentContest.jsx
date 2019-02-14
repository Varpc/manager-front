import React from 'react';
import IceContainer from '@icedesign/container';
import JiSuanKeTable from './components/JiSuanKeTable';
import CodeforcesTable from './components/CodeforcesTable';
import './RecentContest.scss';

export default class RecentContest extends React.Component {
  render() {
    return (
      <div>
        <div className="recent-contest-container recent-contest-title">近期各大OJ比赛统计</div>
        <IceContainer className="recent-contest-container">
          <JiSuanKeTable />
        </IceContainer>
        <IceContainer className="recent-contest-container">
          <CodeforcesTable />
        </IceContainer>
        <IceContainer className="recent-contest-container" style={{ justifyContent: 'center' }} >
          更多OJ敬请期待
        </IceContainer>
      </div>
    );
  }
}
