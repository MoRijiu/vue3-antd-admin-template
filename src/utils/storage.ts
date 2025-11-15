/**
 * 本地存储工具
 * 支持加密存储、过期时间等
 */

import { encryptAES, decryptAES } from './crypto'

/**
 * 存储项接口
 */
interface StorageItem<T> {
  value: T
  expire?: number // 过期时间戳
}

/**
 * 存储配置
 */
interface StorageOptions {
  encrypt?: boolean // 是否加密
  expire?: number // 过期时间（秒）
  secretKey?: string // 加密密钥
}

/**
 * 设置 localStorage
 * @param key 键
 * @param value 值
 * @param options 配置
 */
export function setLocal<T = any>(key: string, value: T, options: StorageOptions = {}): void {
  const { encrypt = false, expire, secretKey } = options

  const item: StorageItem<T> = {
    value,
    expire: expire ? Date.now() + expire * 1000 : undefined,
  }

  let data = JSON.stringify(item)

  if (encrypt) {
    data = encryptAES(data, secretKey)
  }

  localStorage.setItem(key, data)
}

/**
 * 获取 localStorage
 * @param key 键
 * @param options 配置
 * @returns 值
 */
export function getLocal<T = any>(key: string, options: StorageOptions = {}): T | null {
  const { encrypt = false, secretKey } = options

  let data = localStorage.getItem(key)
  if (!data) return null

  try {
    if (encrypt) {
      data = decryptAES(data, secretKey)
    }

    const item: StorageItem<T> = JSON.parse(data)

    // 检查是否过期
    if (item.expire && Date.now() > item.expire) {
      localStorage.removeItem(key)
      return null
    }

    return item.value
  } catch (error) {
    console.error('获取存储失败:', error)
    return null
  }
}

/**
 * 移除 localStorage
 * @param key 键
 */
export function removeLocal(key: string): void {
  localStorage.removeItem(key)
}

/**
 * 清空 localStorage
 */
export function clearLocal(): void {
  localStorage.clear()
}

/**
 * 设置 sessionStorage
 * @param key 键
 * @param value 值
 * @param options 配置
 */
export function setSession<T = any>(key: string, value: T, options: StorageOptions = {}): void {
  const { encrypt = false, expire, secretKey } = options

  const item: StorageItem<T> = {
    value,
    expire: expire ? Date.now() + expire * 1000 : undefined,
  }

  let data = JSON.stringify(item)

  if (encrypt) {
    data = encryptAES(data, secretKey)
  }

  sessionStorage.setItem(key, data)
}

/**
 * 获取 sessionStorage
 * @param key 键
 * @param options 配置
 * @returns 值
 */
export function getSession<T = any>(key: string, options: StorageOptions = {}): T | null {
  const { encrypt = false, secretKey } = options

  let data = sessionStorage.getItem(key)
  if (!data) return null

  try {
    if (encrypt) {
      data = decryptAES(data, secretKey)
    }

    const item: StorageItem<T> = JSON.parse(data)

    // 检查是否过期
    if (item.expire && Date.now() > item.expire) {
      sessionStorage.removeItem(key)
      return null
    }

    return item.value
  } catch (error) {
    console.error('获取存储失败:', error)
    return null
  }
}

/**
 * 移除 sessionStorage
 * @param key 键
 */
export function removeSession(key: string): void {
  sessionStorage.removeItem(key)
}

/**
 * 清空 sessionStorage
 */
export function clearSession(): void {
  sessionStorage.clear()
}
