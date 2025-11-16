/**
 * 哈希工具
 * 基于 js-md5
 */

import * as md5Module from 'js-md5'

const md5 = (md5Module as any).default || md5Module

/**
 * MD5 哈希
 * @param data 要哈希的数据
 * @returns MD5 哈希值
 */
export function hashMD5(data: string): string {
  return md5(data)
}

/**
 * MD5 哈希（多次）
 * @param data 要哈希的数据
 * @param times 哈希次数（默认 2）
 * @returns MD5 哈希值
 */
export function hashMD5Multiple(data: string, times: number = 2): string {
  let result = data
  for (let i = 0; i < times; i++) {
    result = md5(result)
  }
  return result
}

/**
 * 密码加密（MD5 + 盐）
 * @param password 密码
 * @param salt 盐（可选，默认使用固定盐）
 * @returns 加密后的密码
 */
export function encryptPassword(password: string, salt: string = 'vue3-admin-salt'): string {
  return md5(password + salt)
}

/**
 * 文件 MD5（用于文件上传校验）
 * @param file 文件对象
 * @returns Promise<string> MD5 哈希值
 */
export function hashFileMD5(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const hash = md5(arrayBuffer)
        resolve(hash)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 生成唯一 ID（基于时间戳和随机数的 MD5）
 * @returns 唯一 ID
 */
export function generateUniqueId(): string {
  const timestamp = Date.now()
  const random = Math.random()
  return md5(`${timestamp}-${random}`)
}

/**
 * 生成短 ID（MD5 的前 8 位）
 * @returns 短 ID
 */
export function generateShortId(): string {
  return generateUniqueId().substring(0, 8)
}

/**
 * 对象哈希（转 JSON 后 MD5）
 * @param obj 对象
 * @returns MD5 哈希值
 */
export function hashObject(obj: any): string {
  const jsonStr = JSON.stringify(obj)
  return md5(jsonStr)
}

/**
 * 数组哈希（转 JSON 后 MD5）
 * @param arr 数组
 * @returns MD5 哈希值
 */
export function hashArray(arr: any[]): string {
  const jsonStr = JSON.stringify(arr)
  return md5(jsonStr)
}

/**
 * URL 参数签名（用于 API 签名）
 * @param params 参数对象
 * @param secretKey 密钥
 * @returns 签名
 */
export function signParams(params: Record<string, any>, secretKey: string): string {
  // 按 key 排序
  const sortedKeys = Object.keys(params).sort()
  // 拼接参数
  const paramStr = sortedKeys.map((key) => `${key}=${params[key]}`).join('&')
  // 加上密钥后 MD5
  return md5(paramStr + secretKey)
}

/**
 * 验证签名
 * @param params 参数对象
 * @param signature 签名
 * @param secretKey 密钥
 * @returns 是否验证通过
 */
export function verifySignature(
  params: Record<string, any>,
  signature: string,
  secretKey: string
): boolean {
  const calculatedSignature = signParams(params, secretKey)
  return calculatedSignature === signature
}
