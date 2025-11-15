/**
 * 请求取消工具
 * 用于取消重复请求或页面切换时取消未完成的请求
 */

import axios from 'axios'
import type { AxiosRequestConfig, Canceler } from 'axios'

/**
 * 请求映射表
 * key: 请求标识
 * value: 取消函数
 */
const pendingRequests = new Map<string, Canceler>()

/**
 * 生成请求标识
 * @param config 请求配置
 */
function generateRequestKey(config: AxiosRequestConfig): string {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

/**
 * 添加请求到待处理列表
 * @param config 请求配置
 */
export function addPendingRequest(config: AxiosRequestConfig): void {
  const requestKey = generateRequestKey(config)

  // 如果已存在相同请求，取消之前的请求
  if (pendingRequests.has(requestKey)) {
    const cancel = pendingRequests.get(requestKey)
    cancel?.('取消重复请求')
  }

  // 创建新的取消令牌
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      pendingRequests.set(requestKey, cancel)
    })
}

/**
 * 从待处理列表中移除请求
 * @param config 请求配置
 */
export function removePendingRequest(config: AxiosRequestConfig): void {
  const requestKey = generateRequestKey(config)
  pendingRequests.delete(requestKey)
}

/**
 * 取消所有待处理的请求
 * @param message 取消原因
 */
export function cancelAllPendingRequests(message = '取消所有请求'): void {
  pendingRequests.forEach((cancel) => {
    cancel(message)
  })
  pendingRequests.clear()
}

/**
 * 取消指定的请求
 * @param config 请求配置
 * @param message 取消原因
 */
export function cancelRequest(config: AxiosRequestConfig, message = '取消请求'): void {
  const requestKey = generateRequestKey(config)
  const cancel = pendingRequests.get(requestKey)
  if (cancel) {
    cancel(message)
    pendingRequests.delete(requestKey)
  }
}

/**
 * 检查是否为取消请求的错误
 * @param error 错误对象
 */
export function isCancel(error: any): boolean {
  return axios.isCancel(error)
}

/**
 * 清空所有待处理的请求（不取消）
 */
export function clearPendingRequests(): void {
  pendingRequests.clear()
}

/**
 * 获取待处理请求数量
 */
export function getPendingRequestCount(): number {
  return pendingRequests.size
}
