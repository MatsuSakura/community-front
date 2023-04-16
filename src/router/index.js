import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-info' }
    }]
  },
  // {
  //   path: '/house',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'house',
  //   meta: { title: '房屋管理', icon: 'el-icon-s-home' },
  //   children: [
  //     {
  //       path: '/houseBuilding',
  //       name: 'houseBuilding',
  //       component: () => import('@/views/house/houseBuilding'),
  //       meta: { title: '楼栋管理', icon: 'el-icon-s-order' }
  //     },
  //     {
  //       path: '/houseUnit',
  //       name: 'houseUnit',
  //       component: () => import('@/views/house/houseUnit'),
  //       meta: { title: '单元管理', icon: 'el-icon-s-order' }
  //     },
  //     {
  //       path: '/houseList',
  //       name: 'houseList',
  //       component: () => import('@/views/house/houseList'),
  //       meta: { title: '房屋管理', icon: 'el-icon-s-order' }
  //     }
  //   ]
  // },
  // {
  //   path: '/park',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'park',
  //   meta: { title: '车位管理', icon: 'el-icon-truck' },
  //   children: [
  //     {
  //       path: '/parkList',
  //       name: 'parkList',
  //       component: () => import('@/views/park/parkList'),
  //       meta: { title: '车位管理', icon: 'el-icon-truck' }
  //     }
  //   ]
  // },
  // {
  //   path: '/live',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'live',
  //   meta: { title: '业主管理', icon: 'el-icon-s-management' },
  //   children: [
  //     {
  //       path: '/liveUser',
  //       name: 'liveUser',
  //       component: () => import('@/views/live/liveUser'),
  //       meta: { title: '业主列表', icon: 'el-icon-s-data' }
  //     },
  //     {
  //       path: '/liveChildren',
  //       name: 'liveChildren',
  //       component: () => import('@/views/live/liveChildren'),
  //       meta: { title: '学童列表', icon: 'el-icon-s-data' }
  //     },
  //     {
  //       path: '/liveWorker',
  //       name: 'liveWorker',
  //       component: () => import('@/views/live/liveWorker'),
  //       meta: { title: '中青年列表', icon: 'el-icon-s-data' }
  //     },
  //     {
  //       path: '/liveElder',
  //       name: 'liveElder',
  //       component: () => import('@/views/live/liveElder'),
  //       meta: { title: '老年人列表', icon: 'el-icon-s-data' }
  //     },
  //     {
  //       path: '/RelativeList',
  //       name: 'RelativeList',
  //       component: () => import('@/views/live/RelativeList'),
  //       meta: { title: '亲属管理', icon: 'user' }
  //     }
  //   ]
  // },
  // {
  //   path: '/fee',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'fee',
  //   meta: { title: '收费管理', icon: 'el-icon-s-check' },
  //   children: [
  //     {
  //       path: '/feePower',
  //       name: 'feePower',
  //       component: () => import('@/views/fee/feePower'),
  //       meta: { title: '电费管理', icon: 'el-icon-s-finance' }
  //     },
  //     {
  //       path: '/feeWater',
  //       name: 'feeWater',
  //       component: () => import('@/views/fee/feeWater'),
  //       meta: { title: '水费管理', icon: 'el-icon-s-finance' }
  //     },
  //     {
  //       path: '/feePark',
  //       name: 'feePark',
  //       component: () => import('@/views/fee/feePark'),
  //       meta: { title: '停车管理', icon: 'el-icon-s-finance' }
  //     }
  //   ]
  // },
  // {
  //   path: '/userComplaint',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'userComplaint',
  //   meta: { title: '建议管理', icon: 'el-icon-date' },
  //   children: [
  //     {
  //       path: '/userComplaintList',
  //       name: 'userComplaintList',
  //       component: () => import('@/views/userComplaint/userComplaint'),
  //       meta: { title: '建议列表', icon: 'el-icon-edit-outline' }
  //     },
  //     {
  //       path: '/myUserComplaint',
  //       name: 'myUserComplaint',
  //       component: () => import('@/views/userComplaint/myUserComplaint'),
  //       meta: { title: '我的建议', icon: 'el-icon-menu' }
  //     }
  //   ]
  // },
  // {
  //   path: '/repairModel',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'repairModel',
  //   meta: { title: '维修管理', icon: 'el-icon-brush' },
  //   children: [
  //     {
  //       path: '/repairList',
  //       name: 'repairList',
  //       component: () => import('@/views/repair/repairList'),
  //       meta: { title: '维修列表', icon: 'el-icon-edit-outline' }
  //     },
  //     {
  //       path: '/myRepair',
  //       name: 'myRepair',
  //       component: () => import('@/views/repair/myRepair'),
  //       meta: { title: '我的维修', icon: 'el-icon-menu' }
  //     }
  //   ]
  // },

  // {
  //   path: '/system',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'system',
  //   meta: { title: '系统管理', icon: 'el-icon-setting' },
  //   children: [
  //     {
  //       path: '/sysUserList',
  //       name: 'sysUserList',
  //       component: () => import('@/views/system/sysUserList'),
  //       meta: { title: '成员管理', icon: 'user' }
  //     },
  //     {
  //       path: '/sysRoleList',
  //       name: 'sysRoleList',
  //       component: () => import('@/views/system/sysRoleList'),
  //       meta: { title: '角色管理', icon: 'user' }
  //     },
  //     {
  //       path: '/sysMenuList',
  //       name: 'sysMenuList',
  //       component: () => import('@/views/system/sysMenuList'),
  //       meta: { title: '权限管理', icon: 'el-icon-s-tools' }
  //     }
  //   ]
  // },
  // {
  //   path: '/notice',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'notice',
  //   meta: { title: '公告管理', icon: 'el-icon-document-copy' },
  //   children: [
  //     {
  //       path: '/noticeList',
  //       name: 'noticeList',
  //       component: () => import('@/views/notice/noticeList'),
  //       meta: { title: '公告列表', icon: 'el-icon-s-marketing' }
  //     }
  //   ]
  // },

  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
