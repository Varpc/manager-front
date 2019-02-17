// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import BlankLayout from './layouts/BlankLayout';
import AsideLayout from './layouts/AsideLayout';
import Home from './pages/Home';
import Problems from './pages/Problems';
import MyHome from './pages/MyHome';
import Register from './pages/Register';
import RecentContest from './pages/RecentContest';
import Posts from './pages/Posts';
import PostsCreate from './pages/PostsCreate';
import PostsShow from './pages/ShowPost';
import EditInfo from './pages/EditInfo';
import Groups from './pages/Groups';
import EditPost from './pages/EditPost';

import ContestContainer from './pages/Contest';
import Contests from './pages/Contest/pages/Contests';
import ContestHome from './pages/Contest/pages/ContestHome';
import ShowContest from './pages/Contest/pages/ShowContest';

import AdminConfig from './pages/AdminConfig';
import AdminHome from './pages/AdminHome';
import AdminBoard from './pages/AdminBoard';
import AdminPosts from './pages/AdminPosts';
import AdminGroups from './pages/AdminGroups';
import AdminUsers from './pages/AdminUsers';
import AdminContest from './pages/AdminContest';

import NotFound from './pages/NotFound';

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
        path: '/:contests',
        component: ContestHome,
      },
      {
        path: '/:contests/:showcontest',
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
  },
  {
    path: '/admin/home',
    layout: AsideLayout,
    component: AdminHome,
  },
  {
    path: '/admin/board',
    layout: AsideLayout,
    component: AdminBoard,
  },
  {
    path: '/admin/posts',
    layout: AsideLayout,
    component: AdminPosts,
  },
  {
    path: '/admin/users',
    layout: AsideLayout,
    component: AdminUsers,
  },
  {
    path: '/admin/groups',
    layout: AsideLayout,
    component: AdminGroups,
  },
  {
    path: '/admin/contest',
    layout: AsideLayout,
    component: AdminContest,
  },
  {
    path: '/admin/*',
    layout: AsideLayout,
    component: NotFound,
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
