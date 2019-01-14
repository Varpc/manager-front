import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import manager from './manager';

const ICE_CONTAINER = document.getElementById('root');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

ReactDOM.render(manager, ICE_CONTAINER);
