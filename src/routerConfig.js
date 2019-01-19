// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import BlankLayout from './layouts/BlankLayout';
import AsideLayout from './layouts/AsideLayout';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import Problems from './pages/Problems';
import MyHome from './pages/MyHome';
import Register from './pages/Register';
import RecentContest from './pages/RecentContest';
import AdminBoard from './pages/AdminBoard';
import NotFound from './pages/NotFound';


const routerConfig = [
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
    path: '/myhome/:id',
    layout: HeaderFooterLayout,
    component: MyHome,
  },
  {
    path: '/register',
    layout: BlankLayout,
    component: Register,
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
    path: '/admin/*',
    layout: AsideLayout,
    component: NotFound,
  },
  {
    path: '*',
    layout: HeaderFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
