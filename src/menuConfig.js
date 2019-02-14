// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home',
  },
  {
    name: '做题统计',
    path: '/problems',
    icon: 'chart',
  },
  {
    name: '比赛统计',
    path: '/bisai',
    icon: 'content',
  },
  {
    name: '近期比赛',
    path: '/recentcontest',
    icon: 'clock',
  },
  // {
  //   name: '集训管理',
  //   path: '/jixun',
  //   icon: 'cascades',
  // },
  {
    name: '现役队伍',
    path: '/groups',
    icon: 'yonghu',
  },
  {
    name: '比赛总结',
    path: '/posts',
    icon: 'edit',
  },
  // {
  //   name: '报销申请',
  //   path: '/shenqing',
  //   icon: 'shop',
  // },
];

const adminAsideMenuConfig = [
  {
    name: '基本设置',
    path: '/admin/config',
    icon: 'shezhi',
  },
  {
    name: '首页设置',
    path: '/admin/board',
    icon: 'directory',
  },
  {
    name: '总结管理',
    path: '/admin/posts',
    icon: 'content',
  },
  {
    name: '用户管理',
    path: '/admin/users',
    icon: 'yonghu',
  },
  {
    name: '队伍管理',
    path: '/admin/groups',
    icon: 'fans',
  },
];

const adminHeaderMenuConfig = {};

export { headerMenuConfig, adminAsideMenuConfig, adminHeaderMenuConfig };
