/**
 * 菜单相关 Mock 接口
 */
import type { MockMethod } from 'vite-plugin-mock'
import { successResult } from './_util'

// 模拟菜单数据
const mockMenus = [
  {
    id: 1,
    name: '首页',
    path: '/home',
    icon: 'HomeOutlined',
    component: '/views/home/index.vue',
    sort: 1,
    hidden: false,
    children: [],
  },
  {
    id: 2,
    name: '系统管理',
    path: '/system',
    icon: 'SettingOutlined',
    component: null,
    sort: 2,
    hidden: false,
    children: [
      {
        id: 21,
        name: '用户管理',
        path: '/system/user',
        icon: 'UserOutlined',
        component: '/views/system/user/index.vue',
        sort: 1,
        hidden: false,
        children: [],
      },
      {
        id: 22,
        name: '角色管理',
        path: '/system/role',
        icon: 'TeamOutlined',
        component: '/views/system/role/index.vue',
        sort: 2,
        hidden: false,
        children: [],
      },
      {
        id: 23,
        name: '菜单管理',
        path: '/system/menu',
        icon: 'MenuOutlined',
        component: '/views/system/menu/index.vue',
        sort: 3,
        hidden: false,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: '个人中心',
    path: '/profile',
    icon: 'UserOutlined',
    component: '/views/profile/index.vue',
    sort: 3,
    hidden: false,
    children: [],
  },
]

export default [
  // 获取菜单列表
  {
    url: '/api/menu/list',
    method: 'get',
    timeout: 0,
    response: () => {
      return successResult(mockMenus)
    },
  },

  // 获取用户菜单（根据角色过滤）
  {
    url: '/api/menu/user',
    method: 'get',
    timeout: 0,
    response: () => {
      // 这里可以根据 token 获取用户角色，然后过滤菜单
      // 简化处理，直接返回所有菜单
      return successResult(mockMenus)
    },
  },

  // 获取菜单详情
  {
    url: '/api/menu/:id',
    method: 'get',
    timeout: 0,
    response: ({ query }: any) => {
      const { id } = query

      // 递归查找菜单
      const findMenu = (menus: any[], menuId: number): any => {
        for (const menu of menus) {
          if (menu.id === menuId) {
            return menu
          }
          if (menu.children && menu.children.length > 0) {
            const found = findMenu(menu.children, menuId)
            if (found) return found
          }
        }
        return null
      }

      const menu = findMenu(mockMenus, Number(id))
      return successResult(menu)
    },
  },
] as MockMethod[]
