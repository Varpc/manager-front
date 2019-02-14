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

import AdminConfig from './pages/AdminConfig';
import AdminHome from './pages/AdminHome';
import AdminBoard from './pages/AdminBoard';
import AdminPosts from './pages/AdminPosts';
import AdminGroups from './pages/AdminGroups';
import AdminUsers from './pages/AdminUsers';

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
