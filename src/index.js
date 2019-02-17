import ReactDOM from 'react-dom';
import React from 'react';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import 'braft-editor/dist/index.css';
import '@icedesign/base/reset.scss';
import Root from './manager';

const ICE_CONTAINER = document.getElementById('root');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

ReactDOM.render(<Root />, ICE_CONTAINER);
