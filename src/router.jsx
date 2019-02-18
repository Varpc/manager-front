/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/**
 * 定义应用路
 */
import React from 'react';
// import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
// import Confirm from './components/Confirm';
// import routerConfig from './routerConfig';

// 路由切换时确认弹窗
// const confirm = (message, callback) => {
//   console.log('confirm');
//   ReactDOM.render(
//     <Confirm message={message} callback={callback} />,
//     document.getElementById('confirm')
//   );
// };

let isLogin;
let isAdmin; // 用于在生成路由时记录用户是否登陆的中间变量

/**
 * 将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 */
function recursiveRouterConfigV4(config = []) {
  const routeMap = [];
  config.forEach((item) => {
    const route = {
      path: item.path,
      layout: item.layout,
      component: item.component,
    };
    if (!item.rule || typeof item.rule === 'undefined') {
      if (Array.isArray(item.children)) {
        route.childRoutes = recursiveRouterConfigV4(item.children);
      }
      routeMap.push(route);
    } else if (item.rule === 'user' && isLogin) {
      if (Array.isArray(item.children)) {
        route.childRoutes = recursiveRouterConfigV4(item.children);
      }
      routeMap.push(route);
    } else if (item.rule === 'admin' && isLogin && isAdmin) {
      if (Array.isArray(item.children)) {
        route.childRoutes = recursiveRouterConfigV4(item.children);
      }
      routeMap.push(route);
    }
  });
  return routeMap;
}

/**
 * 将扁平化后的路由信息生成 Route 节点
 *
 * @param {Element} container 路由容器
 * @param {object} router 路由对象
 * @param {string} contextPath 上层路由地址
 * @return {Route}
 * @example
 * <Switch>
 *   <Route exact path="/" component={Home} />
 *   <Route exact path="/page3" component={Page3} />
 *   <Route exact path="/page4" component={Page4} />
 *   <Route exact path="/page3/:id" component={Page3} />
 *   <Route exact component={NotFound} />
 * </Switch>
 */
function renderRouterConfigV4(container, router, contextPath) {
  const routeChildren = [];
  const renderRoute = (routeContainer, routeItem, routeContextPath) => {
    let routePath;
    if (!routeItem.path) {
      // eslint-disable-next-line
      console.error('route must has `path`');
    } else if (routeItem.path === '/' || routeItem.path === '*') {
      routePath = routeItem.path;
    } else {
      routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/');
    }

    // 优先使用当前定义的 layout
    if (routeItem.layout && routeItem.component) {
      routeChildren.push(
        <Route
          key={routePath}
          exact
          path={routePath}
          render={(props) => {
            return React.createElement(
              routeItem.layout,
              props,
              React.createElement(routeItem.component, props)
            );
          }}
        />
      );
    } else if (routeContainer && routeItem.component) {
      // 使用上层节点作为 container
      routeChildren.push(
        <Route
          key={routePath}
          exact
          path={routePath}
          render={(props) => {
            return React.createElement(
              routeContainer,
              props,
              React.createElement(routeItem.component, props)
            );
          }}
        />
      );
    } else {
      routeChildren.push(
        <Route
          key={routePath}
          exact
          path={routePath}
          component={routeItem.component}
        />
      );
    }

    // 存在子路由，递归当前路径，并添加到路由中
    if (Array.isArray(routeItem.childRoutes)) {
      routeItem.childRoutes.forEach((r) => {
        // 递归传递当前 route.component 作为子节点的 container
        renderRoute(routeItem.component, r, routePath);
      });
    }
  };

  router.forEach((r) => {
    renderRoute(container, r, contextPath);
  });

  return <Switch>{routeChildren}</Switch>;
}

// const routerWithReactRouter4 = recursiveRouterConfigV4(routerConfig);
// const routeChildren = renderRouterConfigV4(null, routerWithReactRouter4, '/');
// export default <Router>{routeChildren}</Router>;

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.store.subscribe(() => {
      this.forceUpdate(); // store改变时自动render
      // console.log('update');
    });
  }

  render() {
    isLogin = this.props.store.getState().user.is_login;
    isAdmin = this.props.store.getState().user.is_admin;
    // console.log('is_login', isLogin);
    // console.log('is_admin', isAdmin);
    const routerWithReactRouter4 = recursiveRouterConfigV4(
      this.props.routeConfig
    );
    const routeChildren = renderRouterConfigV4(
      null,
      routerWithReactRouter4,
      '/'
    );
    return (
      <Provider store={this.props.store}>
        <Router>{routeChildren}</Router>
      </Provider>
    );
  }
}
