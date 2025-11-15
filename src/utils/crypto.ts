/**
 * 加密工具
 * 基于 crypto-js
 */

import CryptoJS from 'crypto-js'

/**
 * 默认密钥（建议在环境变量中配置）
 */
const DEFAULT_SECRET_KEY = 'vue3-antd-admin-secret-key'

/**
 * AES 加密
 * @param data 要加密的数据
 * @param secretKey 密钥（可选）
 * @returns 加密后的字符串
 */
export function encryptAES(data: string, secretKey: string = DEFAULT_SECRET_KEY): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString()
}

/**
 * AES 解密
 * @param encryptedData 加密的数据
 * @param secretKey 密钥（可选）
 * @returns 解密后的字符串
 */
export function decryptAES(encryptedData: string, secretKey: string = DEFAULT_SECRET_KEY): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

/**
 * Base64 编码
 * @param data 要编码的数据
 * @returns Base64 字符串
 */
export function encodeBase64(data: string): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
}

/**
 * Base64 解码
 * @param base64Data Base64 字符串
 * @returns 解码后的字符串
 */
export function decodeBase64(base64Data: string): string {
  return CryptoJS.enc.Base64.parse(base64Data).toString(CryptoJS.enc.Utf8)
}

/**
 * MD5 哈希
 * @param data 要哈希的数据
 * @returns MD5 哈希值
 */
export function md5(data: string): string {
  return CryptoJS.MD5(data).toString()
}

/**
 * SHA256 哈希
 * @param data 要哈希的数据
 * @returns SHA256 哈希值
 */
export function sha256(data: string): string {
  return CryptoJS.SHA256(data).toString()
}

/**
 * SHA512 哈希
 * @param data 要哈希的数据
 * @returns SHA512 哈希值
 */
export function sha512(data: string): string {
  return CryptoJS.SHA512(data).toString()
}

/**
 * HMAC-SHA256 签名
 * @param data 要签名的数据
 * @param secretKey 密钥
 * @returns HMAC-SHA256 签名
 */
export function hmacSHA256(data: string, secretKey: string): string {
  return CryptoJS.HmacSHA256(data, secretKey).toString()
}

/**
 * 生成随机字符串
 * @param length 长度（默认 32）
 * @returns 随机字符串
 */
export function randomString(length: number = 32): string {
  return CryptoJS.lib.WordArray.random(length / 2).toString()
}

/**
 * 加密对象（转 JSON 后加密）
 * @param obj 要加密的对象
 * @param secretKey 密钥（可选）
 * @returns 加密后的字符串
 */
export function encryptObject(obj: any, secretKey: string = DEFAULT_SECRET_KEY): string {
  const jsonStr = JSON.stringify(obj)
  return encryptAES(jsonStr, secretKey)
}

/**
 * 解密对象（解密后转 JSON）
 * @param encryptedData 加密的数据
 * @param secretKey 密钥（可选）
 * @returns 解密后的对象
 */
export function decryptObject<T = any>(
  encryptedData: string,
  secretKey: string = DEFAULT_SECRET_KEY
): T {
  const jsonStr = decryptAES(encryptedData, secretKey)
  return JSON.parse(jsonStr)
}

/**
 * 加密存储到 localStorage
 * @param key 存储键
 * @param value 存储值
 * @param secretKey 密钥（可选）
 */
export function setEncryptedStorage(
  key: string,
  value: any,
  secretKey: string = DEFAULT_SECRET_KEY
): void {
  const encrypted = encryptObject(value, secretKey)
  localStorage.setItem(key, encrypted)
}

/**
 * 从 localStorage 解密读取
 * @param key 存储键
 * @param secretKey 密钥（可选）
 * @returns 解密后的值
 */
export function getEncryptedStorage<T = any>(
  key: string,
  secretKey: string = DEFAULT_SECRET_KEY
): T | null {
  const encrypted = localStorage.getItem(key)
  if (!encrypted) return null
  try {
    return decryptObject<T>(encrypted, secretKey)
  } catch (error) {
    console.error('解密失败:', error)
    return null
  }
}
