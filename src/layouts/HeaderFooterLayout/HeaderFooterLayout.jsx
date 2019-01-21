import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './scss/light.scss';
// import './HeaderFooterLayout.scss';

export default class HeaderFooterLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="header-footer-layout">
        <Header />
        <div style={styles.mainContent}>{this.props.children}</div>
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  mainContent: {
    marginTop: '62px',
    padding: '0',
    minHeight: 'calc(100vh - 62px - 76px)', // 使页脚动态的固定在底部，窗口高度减去header和footer的高度
  },
};
