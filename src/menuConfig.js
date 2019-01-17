// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const asideMenuConfig = [
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
    path: '#',
    icon: 'content',
  },
  {
    name: '近期比赛',
    path: '/recentcontest',
    icon: 'clock',
  },
  {
    name: '集训管理',
    path: '#',
    icon: 'cascades',
  },
  {
    name: '现役队伍',
    path: '#',
    icon: 'yonghu',
  },
  {
    name: '比赛总结',
    path: '#',
    icon: 'edit',
  },
  {
    name: '报销申请',
    path: '#',
    icon: 'shop',
  },
];

const headerMenuConfig = asideMenuConfig;

export default headerMenuConfig;
