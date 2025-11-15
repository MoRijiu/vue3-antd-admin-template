/*
 * @Author: morijiu
 * @Date: 2025-11-15 19:38:47
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 19:40:44
 * @Description:
 * @FilePath: \vue3-antd-admin-template\src\router\routes.ts
 */
/**
 * 路由配置
 * 分模块管理路由
 */

import type { RouteRecordRaw } from 'vue-router'

/**
 * 基础路由
 */
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/test-login',
    name: 'TestLogin',
    component: () => import('@/views/test-login.vue'),
    meta: {
      title: '登录测试',
      requiresAuth: false,
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false,
    },
  },
]

/**
 * 主要路由
 */
export const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/default/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeOutlined',
          requiresAuth: true,
        },
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserOutlined',
          requiresAuth: true,
        },
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
          title: '系统设置',
          icon: 'SettingOutlined',
          requiresAuth: true,
        },
      },
    ],
  },
]

/**
 * 所有路由
 */
export const routes: RouteRecordRaw[] = [
  ...basicRoutes,
  ...mainRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
