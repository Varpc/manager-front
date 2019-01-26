import React, { Component } from 'react';
import { Table, Pagination, Feedback, Search, Button } from '@icedesign/base';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProblemsTable.scss';

const Toast = Feedback.toast;

export default class ProblemsTable extends Component {
  static displayName = 'ProblemsTable';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 30,
      isLoading: true,
      data: [],
      dataSource: [],
    };
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/problems')
      .then((r) => {
        this.state.data = r.data.data;
        this.setState({
          data: this.state.data.concat(), // 数组深拷贝
          dataSource: this.state.data.concat(),
          isLoading: false,
        });
      })
      .catch((error) => {
        Toast.error('网络错误，请稍后重试');
        console.log(error);
        this.setState({
          isLoading: false,
        });
      });
  }

  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  handlePageSizeChange(size) {
    this.setState({
      pageSize: size,
    });
  }

  handleSort = (dataIndex, order) => {
    const dataSource = this.state.dataSource.sort((a, b) => {
      const result = a[dataIndex] - b[dataIndex];
      if (order === 'asc') {
        return result > 0 ? 1 : -1;
      }
      return result > 0 ? -1 : 1;
    });

    this.setState({
      dataSource,
    });
  };

  renderState = (value) => {
    if (value === 0) {
      return (
        <div className="state">
          <span className="circle-blue" />
          <span className="state-text-blue">审核</span>
        </div>
      );
    } else if (value === 1) {
      return (
        <div className="state">
          <span className="circle-green" />
          <span className="state-text-green">现役</span>
        </div>
      );
    } else if (value === 2) {
      return (
        <div className="state">
          <span className="circle-blue" />
          <span className="state-text-blue">退役</span>
        </div>
      );
    } else if (value === 3) {
      return (
        <div className="state">
          <span className="circle-red" />
          <span className="state-text-red">除名</span>
        </div>
      );
    }
  };

  renderName = (value) => {
    return (
      <Link to={`/myhome/${value.user_id}`}>
        {value.name}
      </Link>
    );
  }

  tableRender() {
    const { dataSource } = this.state;
    const from = (this.state.current - 1) * this.state.pageSize;
    const to = this.state.current * this.state.pageSize;
    const ans = [];
    for (let i = from; i < to && i < dataSource.length; i += 1) {
      ans.push(dataSource[i]);
    }
    return (
      <Table
        dataSource={ans}
        onSort={this.handleSort}
        isLoading={this.state.isLoading}
        hasBorder={false}
        className="custom-table"
      >
        <Table.Column title="序列号" dataIndex="user.user_id" />
        <Table.Column title="姓名" dataIndex="user" cell={this.renderName} />
        <Table.Column title="班级" dataIndex="user.banji" />
        <Table.Column title="总计" dataIndex="sum" sortable />
        <Table.Column title="蓝书" dataIndex="blue_book" />
        <Table.Column title="紫书" dataIndex="purple_book" />
        <Table.Column title="总题数" dataIndex="count" sortable />
        <Table.Column title="uva" dataIndex="uva" />
        <Table.Column title="HDU" dataIndex="hdu" />
        <Table.Column title="POJ" dataIndex="poj" />
        <Table.Column title="cf" dataIndex="cf" />
        <Table.Column title="bc" dataIndex="bc" />
        <Table.Column title="状态" dataIndex="user.status" cell={this.renderState} />
      </Table>
    );
  }

  setDataSource = (key) => {
    const ans = [];
    this.state.data.map((item) => {
      if (key === '' || item.user.name.includes(key) || item.user.banji.includes(key)) {
        ans.push(item);
      }
      return item.id; // 处理警告
    });
    this.setState({
      dataSource: ans,
    });
  };

  onSerchChange = (value) => {
    this.setDataSource(value);
  };

  onSearch = (value) => {
    this.setDataSource(value.key);
  };

  // 设置dataSource为只显示现役
  setDataSourceNow = () => {
    const ans = [];
    this.state.data.map((item) => {
      if (item.user.status === 1) {
        ans.push(item);
      }
      return item.id;
    });
    this.setState({
      dataSource: ans,
    });
  }

  // 设置dataSource为全部
  setDataSourceAll = () => {
    this.setDataSource('');
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="page-header-title">
            做题统计<small>上次更新: 3小时前</small>
          </div>
        </div>
        <hr />
        <div className="search-header">
          <Search onChange={this.onSerchChange} onSearch={this.onSearch} placeholder="搜索" />
          <div className="buttons">
            <Button onClick={this.setDataSourceAll} className="button">查看全部</Button>
            <Button type="primary" onClick={this.setDataSourceNow}>
              只看现役
            </Button>
          </div>
        </div>
        {this.tableRender()}
        <Pagination
          style={styles.pagination}
          shape="arrow-only"
          current={this.state.current}
          onChange={this.handlePagination}
          total={this.state.dataSource.length}
          pageSize={this.state.pageSize}
          pageSizeSelector="dropdown"
          pageSizePosition="start"
          onPageSizeChange={this.handlePageSizeChange}
          pageSizeList={[30, 50, 100, 150]}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  circleGreen: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateTextGreen: {
    color: '#28a745',
  },
};
