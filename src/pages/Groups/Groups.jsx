import { Card, Feedback } from '@icedesign/base';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IceContainer from '@icedesign/container';
import React from 'react';
import './Groups.scss';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    axios
      .get('/api/groups')
      .then((r) => {
        console.log(r.data);
        this.setState({
          dataSource: r.data.data,
        });
      })
      .catch((e) => {
        console.log(e);
        Feedback.toast.error('网络错误');
      });
  }

  render() {
    return (
      <div className="groups-page">
        <div className="groups-container">
          <div className="page-header">
            <div className="page-title">现役队伍</div>
          </div>
          <IceContainer className="ice-container">
            <div className="items">
              {this.state.dataSource.map((item) => {
                return (
                  <Card
                    className="card"
                    key={item.group_id}
                    title={item.name}
                    subTitle={item.no}
                    bodyHeight="auto"
                  >
                    <div className="content">
                      <div>
                        成员：
                        {item.user.map((user) => {
                          return (
                            <Link to={`/myhome/${user.id}`}>
                              {user.name}&nbsp;
                            </Link>
                          );
                        })}
                      </div>
                      <div>
                        当前积分:
                        <span className="score">{item.score}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </IceContainer>
        </div>
      </div>
    );
  }
}
