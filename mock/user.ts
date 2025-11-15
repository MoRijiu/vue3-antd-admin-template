/**
 * 用户相关 Mock 接口
 */
import type { MockMethod } from 'vite-plugin-mock'
import { successResult, errorResult } from './_util'

// 模拟用户数据
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    name: '管理员',
    realName: '管理员',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    email: 'admin@example.com',
    phone: '13800138000',
    status: 1,
    roles: ['admin'],
    permissions: ['*:*:*'],
    createTime: '2024-01-01 00:00:00',
  },
  {
    id: 2,
    username: 'user',
    password: '123456',
    name: '普通用户',
    realName: '普通用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    email: 'user@example.com',
    phone: '13800138001',
    status: 1,
    roles: ['user'],
    permissions: ['user:read', 'user:write'],
    createTime: '2024-01-01 00:00:00',
  },
]

// 模拟 token
const mockTokens: Record<string, any> = {}

export default [
  // 用户登录
  {
    url: '/api/auth/login',
    method: 'post',
    timeout: 0,
    response: ({ body }: any) => {
      const { username, password } = body

      // 查找用户
      const user = mockUsers.find((u) => u.username === username && u.password === password)

      if (!user) {
        return errorResult('用户名或密码错误', 401)
      }

      // 生成 token
      const token = `mock_token_${user.id}_${Date.now()}`
      mockTokens[token] = user

      const result = successResult({
        token,
        userInfo: {
          id: user.id,
          name: user.name,
          username: user.username,
          realName: user.realName,
          avatar: user.avatar,
          email: user.email,
          phone: user.phone,
          status: user.status,
          roles: user.roles,
          permissions: user.permissions,
        },
      })

      return result
    },
  },

  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    timeout: 0,
    response: ({ headers }: any) => {
      const token = headers?.authorization?.replace('Bearer ', '')

      if (!token || !mockTokens[token]) {
        return errorResult('未授权，请重新登录', 401)
      }

      const user = mockTokens[token]
      return successResult({
        id: user.id,
        name: user.name,
        username: user.username,
        realName: user.realName,
        avatar: user.avatar,
        email: user.email,
        phone: user.phone,
        status: user.status,
        roles: user.roles,
        permissions: user.permissions,
      })
    },
  },

  // 获取当前用户信息（兼容接口）
  {
    url: '/api/auth/current',
    method: 'get',
    timeout: 0,
    response: ({ headers }: any) => {
      const token = headers?.authorization?.replace('Bearer ', '')

      if (!token || !mockTokens[token]) {
        return errorResult('未授权，请重新登录', 401)
      }

      const user = mockTokens[token]
      return successResult({
        id: user.id,
        name: user.name,
        username: user.username,
        realName: user.realName,
        avatar: user.avatar,
        email: user.email,
        phone: user.phone,
        status: user.status,
        roles: user.roles,
        permissions: user.permissions,
      })
    },
  },

  // 用户登出
  {
    url: '/api/auth/logout',
    method: 'post',
    timeout: 0,
    response: ({ headers }: any) => {
      const token = headers?.authorization?.replace('Bearer ', '')

      if (token && mockTokens[token]) {
        delete mockTokens[token]
      }

      return successResult(null, '登出成功')
    },
  },

  // 获取用户列表
  {
    url: '/api/user/list',
    method: 'get',
    timeout: 0,
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10, keyword = '' } = query

      // 过滤用户
      let filteredUsers = mockUsers
      if (keyword) {
        filteredUsers = mockUsers.filter(
          (u) =>
            u.username.includes(keyword) ||
            u.realName.includes(keyword) ||
            u.email.includes(keyword)
        )
      }

      // 分页
      const start = (Number(page) - 1) * Number(pageSize)
      const end = start + Number(pageSize)
      const list = filteredUsers.slice(start, end)

      return successResult({
        list: list.map((u) => ({
          id: u.id,
          username: u.username,
          realName: u.realName,
          avatar: u.avatar,
          email: u.email,
          phone: u.phone,
          roles: u.roles,
        })),
        total: filteredUsers.length,
        page: Number(page),
        pageSize: Number(pageSize),
      })
    },
  },
] as MockMethod[]
