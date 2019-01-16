import React, { Component } from 'react';

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
      <div style={styles.pageContainer}>
        <div style={styles.pageHead}>
          <div style={styles.pageTitle}>药品调价</div>
        </div>
      </div>
    );
  }
}

const styles = {
  pageHead: {
    margin: '0 0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    height: '20px',
    lineHeight: '20px',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
    paddingLeft: '12px',
    borderLeft: '4px solid #666',
  },
  tableFilter: {
    background: '#f4f4f4',
    padding: '10px 20px',
    marginBottom: '10px',
  },
};
