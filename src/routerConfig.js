// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import loadable from 'react-loadable';
import React from 'react';
import Loading from './components/Loading';
import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import BlankLayout from './layouts/BlankLayout';
import AsideLayout from './layouts/AsideLayout';
import Home from './pages/Home';
import Problems from './pages/Problems';
import MyHome from './pages/MyHome';
// import Register from './pages/Register';
import RecentContest from './pages/RecentContest';
import Posts from './pages/Posts';
// import PostsCreate from './pages/PostsCreate';

import PostsShow from './pages/ShowPost';
// import EditInfo from './pages/EditInfo';
import Groups from './pages/Groups';
// import EditPost from './pages/EditPost';

import ContestContainer from './pages/Contest';
import Contests from './pages/Contest/pages/Contests';
import ContestHome from './pages/Contest/pages/ContestHome';
import ShowContest from './pages/Contest/pages/ShowContest';

// import AdminConfig from './pages/AdminConfig';
// import AdminHome from './pages/AdminHome';
// import AdminBoard from './pages/AdminBoard';
// import AdminPosts from './pages/AdminPosts';
// import AdminGroups from './pages/AdminGroups';
// import AdminUsers from './pages/AdminUsers';
// import AdminContest from './pages/AdminContest';

// import NotFound from './pages/NotFound';

const Register = loadable({
  loader: () => import('./pages/Register'),
  loading: () => <Loading />,
});

const PostsCreate = loadable({
  loader: () => import('./pages/PostsCreate'),
  loading: () => <Loading />,
});

const EditPost = loadable({
  loader: () => import('./pages/EditPost'),
  loading: () => <Loading />,
});

const EditInfo = loadable({
  loader: () => import('./pages/EditInfo'),
  loading: () => <Loading />,
});

const AdminConfig = loadable({
  loader: () => import('./pages/AdminConfig'),
  loading: () => <Loading />,
});
const AdminHome = loadable({
  loader: () => import('./pages/AdminHome'),
  loading: () => <Loading />,
});
const AdminBoard = loadable({
  loader: () => import('./pages/AdminBoard'),
  loading: () => <Loading />,
});
const AdminPosts = loadable({
  loader: () => import('./pages/AdminPosts'),
  loading: () => <Loading />,
});
const AdminGroups = loadable({
  loader: () => import('./pages/AdminGroups'),
  loading: () => <Loading />,
});
const AdminUsers = loadable({
  loader: () => import('./pages/AdminUsers'),
  loading: () => <Loading />,
});
const AdminContest = loadable({
  loader: () => import('./pages/AdminContest'),
  loading: () => <Loading />,
});
const NotFound = loadable({
  loader: () => import('./components/BasicNotFound'),
  loading: () => <Loading />,
});

const userRouterConfig = [
  {
    path: '/',
    layout: HeaderFooterLayout,
    component: Home,
  },
  {
    path: '/problems',
    layout: HeaderFooterLayout,
    component: Problems,
  },
  {
    // 这里为了能嵌套子页面，把布局放在了Contest中，router.jsx中渲染时，当有layout时，使用layout作为布局，没有layout时，
    // 选用父组件用作布局，没有父组件时，则没有布局
    path: '/contest',
    component: ContestContainer,
    children: [
      {
        path: '/home',
        component: Contests,
      },
      {
        path: '/:contestseason',
        component: ContestHome,
      },
      {
        path: '/:contestseason/:showcontest',
        component: ShowContest,
      },
    ],
  },
  {
    path: '/recentcontest',
    layout: HeaderFooterLayout,
    component: RecentContest,
  },
  {
    path: '/posts',
    layout: HeaderFooterLayout,
    component: Posts,
  },
  {
    path: '/groups',
    layout: HeaderFooterLayout,
    component: Groups,
  },
  {
    path: '/postscreate',
    layout: HeaderFooterLayout,
    component: PostsCreate,
    rule: 'user',
  },
  {
    path: '/post/:post_id',
    layout: HeaderFooterLayout,
    component: PostsShow,
  },
  {
    path: '/post/:post_id/edit',
    layout: HeaderFooterLayout,
    component: EditPost,
    rule: 'user',
  },
  {
    path: '/myhome/:id',
    layout: HeaderFooterLayout,
    component: MyHome,
  },
  {
    path: '/editinfo/:id',
    layout: HeaderFooterLayout,
    component: EditInfo,
    rule: 'user',
  },
  {
    path: '/register',
    layout: BlankLayout,
    component: Register,
  },
];

const adminRouterConfig = [
  {
    path: '/admin/config',
    layout: AsideLayout,
    component: AdminConfig,
    rule: 'admin',
  },
  {
    path: '/admin/home',
    layout: AsideLayout,
    component: AdminHome,
    rule: 'admin',
  },
  {
    path: '/admin/board',
    layout: AsideLayout,
    component: AdminBoard,
    rule: 'admin',
  },
  {
    path: '/admin/posts',
    layout: AsideLayout,
    component: AdminPosts,
    rule: 'admin',
  },
  {
    path: '/admin/users',
    layout: AsideLayout,
    component: AdminUsers,
    rule: 'admin',
  },
  {
    path: '/admin/groups',
    layout: AsideLayout,
    component: AdminGroups,
    rule: 'admin',
  },
  {
    path: '/admin/contest',
    layout: AsideLayout,
    component: AdminContest,
    rule: 'admin',
  },
  {
    path: '/admin/*',
    layout: AsideLayout,
    component: NotFound,
    rule: 'admin',
  },
];

const routerConfig = [
  ...userRouterConfig,
  ...adminRouterConfig,
  {
    path: '*',
    layout: HeaderFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
