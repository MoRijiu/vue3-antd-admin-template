/**
 * 示例 API
 * 展示如何使用 Axios 封装的请求方法
 */

import http from '@/utils/http'
import type { ApiResponse, PageParams, PageResponse } from '@/utils/http'

/**
 * 用户信息接口
 */
export interface User {
  id: number
  name: string
  username?: string
  realName?: string
  email: string
  avatar?: string
  phone?: string
  status?: number
  roles?: string[]
  permissions?: string[]
  createTime?: string
}

/**
 * 用户查询参数
 */
export interface UserQueryParams extends PageParams {
  name?: string
  email?: string
  status?: number
}

/**
 * 登录参数
 */
export interface LoginParams {
  username: string
  password: string
}

/**
 * 登录响应
 */
export interface LoginResponse {
  token: string
  userInfo: User
}

/**
 * 获取用户列表
 * 请求地址: /api/users (会被代理到 VITE_API_PROXY_TARGET/users)
 */
export function getUserList(params?: UserQueryParams): Promise<ApiResponse<User[]>> {
  return http.get('/users', params)
}

/**
 * 分页获取用户列表
 */
export function getUserPage(params: UserQueryParams): Promise<ApiResponse<PageResponse<User>>> {
  return http.getPage('/users/page', params)
}

/**
 * 获取用户详情
 * @param id 用户 ID
 */
export function getUserById(id: number): Promise<ApiResponse<User>> {
  return http.get(`/users/${id}`)
}

/**
 * 创建用户
 * @param user 用户信息
 */
export function createUser(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
  return http.post('/users', user)
}

/**
 * 更新用户
 * @param id 用户 ID
 * @param user 用户信息
 */
export function updateUser(id: number, user: Partial<User>): Promise<ApiResponse<User>> {
  return http.put(`/users/${id}`, user)
}

/**
 * 删除用户
 * @param id 用户 ID
 */
export function deleteUser(id: number): Promise<ApiResponse<void>> {
  return http.delete(`/users/${id}`)
}

/**
 * 批量删除用户
 * @param ids 用户 ID 数组
 */
export function batchDeleteUsers(ids: number[]): Promise<ApiResponse<void>> {
  return http.post('/users/batch-delete', { ids })
}

/**
 * 用户登录
 * @param params 登录参数
 */
export function login(params: LoginParams): Promise<ApiResponse<LoginResponse>> {
  return http.post('/auth/login', params)
}

/**
 * 用户登出
 */
export function logout(): Promise<ApiResponse<void>> {
  return http.post('/auth/logout')
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser(): Promise<ApiResponse<User>> {
  return http.get('/auth/current')
}

/**
 * 上传用户头像
 * @param file 文件
 */
export function uploadAvatar(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData()
  formData.append('file', file)
  return http.upload('/users/avatar', formData)
}

/**
 * 导出用户数据
 */
export function exportUsers(params?: UserQueryParams): Promise<any> {
  return http.download('/users/export', params)
}
