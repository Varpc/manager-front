import { Feedback, Nav } from '@icedesign/base';
import axios from 'axios';
import React from 'react';
import './AdminUsers.scss';
import QuitUsers from './components/QuitUsers';
import RetireUsers from './components/RetireUsers';
import ReviewUsers from './components/ReviewUsers';
import ServiceUsers from './components/ServiceUsers';


const { Item } = Nav;

export default class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '0',
      dataSource: [],
    };
  }
  handleItemClick = (key) => {
    this.setState({
      key,
    });
  };

  componentDidMount() {
    axios
      .get('/api/admin/users')
      .then((r) => {
        this.setState({
          dataSource: r.data.data,
        });
      })
      .catch((e) => {
        console.log(e);
        Feedback.toast.error('网络错误，请稍后重试');
      });
  }

  handleToDelete = (id) => {
    this.setState({
      dataSource: this.state.dataSource.filter(item => item.id !== id),
    });
  }

  renderContent = () => {
    const key = this.state.key;
    const dataSource = this.state.dataSource;
    // console.log('data', dataSource);
    const a = dataSource.filter(item => item.status === 0);
    // console.log('test', a);
    // 0审核 1现役 2退役 3除名
    switch (key) {
      case '0':
        return (
          <ReviewUsers data={a} />
        );
      case '1':
        return (
          <ServiceUsers data={dataSource.filter(item => item.status === 1)} />
        );
      case '2':
        return (
          <RetireUsers data={dataSource.filter(item => item.status === 2)} onDelete={this.handleToDelete} />
        );
      case '3':
        return (
          <QuitUsers data={dataSource.filter(item => item.status === 3)} onDelete={this.handleToDelete} />
        );
      default:
        return <ReviewUsers data={dataSource.filter(item => item.status === 0)} />;
    }
  };

  render() {
    return (
      <div>
        <Nav
          className="nav"
          direction="hoz"
          activeDirection="bottom"
          defaultSelectedKeys={['0']}
        >
          <Item key="0" icon="service" onClick={this.handleItemClick}>
            待审核
          </Item>
          <Item key="1" icon="favorite" onClick={this.handleItemClick}>
            现役队员
          </Item>
          <Item key="2" icon="edit" onClick={this.handleItemClick}>
            退役队员
          </Item>
          <Item key="3" icon="edit" onClick={this.handleItemClick}>
            除名队员
          </Item>
        </Nav>
        {this.renderContent()}
      </div>
    );
  }
}
