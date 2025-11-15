/*
 * @Author: morijiu
 * @Date: 2025-11-15 20:23:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-11-15 22:31:35
 * @Description:
 * @FilePath: \vue3-antd-admin-template\mock\_util.ts
 */
/**
 * Mock 工具函数
 * 提供常用的 Mock 数据生成和响应处理函数
 */
import type { MockMethod } from 'vite-plugin-mock'

/**
 * 成功响应
 * @param data 响应数据
 * @param message 提示信息
 */
export function successResult<T = any>(data: T, message = 'success') {
  return {
    code: 200,
    data,
    message,
    success: true,
    timestamp: Date.now(),
  }
}

/**
 * 错误响应
 * @param message 错误信息
 * @param code 错误码
 */
export function errorResult(message = 'error', code = 500) {
  return {
    code,
    data: null,
    message,
    success: false,
    timestamp: Date.now(),
  }
}

/**
 * 分页响应
 * @param page 当前页码
 * @param pageSize 每页数量
 * @param list 数据列表
 * @param total 总数
 */
export function paginationResult<T = any>(
  page: number,
  pageSize: number,
  list: T[],
  total?: number
) {
  const pageData = {
    current: page,
    pageSize,
    total: total || list.length,
    list: list.slice((page - 1) * pageSize, page * pageSize),
  }
  return successResult(pageData)
}

/**
 * 延迟响应（模拟网络延迟）
 * @param time 延迟时间（毫秒）
 */
export function delay(time = 300) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/**
 * 从请求中获取 token
 * @param request 请求对象
 */
export function getRequestToken(request: any): string | null {
  const token = request.headers?.authorization
  return token ? token.replace('Bearer ', '') : null
}

/**
 * 创建 Mock 方法
 * @param method HTTP 方法
 * @param url 请求路径
 * @param response 响应函数或数据
 * @param timeout 延迟时间
 */
export function createMockMethod(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  response: any,
  timeout = 300
): MockMethod {
  return {
    url,
    method,
    timeout,
    response,
  }
}
