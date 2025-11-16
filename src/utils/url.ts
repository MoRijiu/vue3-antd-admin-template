/**
 * URL 工具
 */

/**
 * 解析 URL 参数
 * @param url URL（可选，默认当前页面 URL）
 * @returns 参数对象
 */
export function parseUrlParams(url?: string): Record<string, string> {
  const urlStr = url || window.location.href
  const params: Record<string, string> = {}

  const searchIndex = urlStr.indexOf('?')
  if (searchIndex === -1) return params

  const search = urlStr.substring(searchIndex + 1)
  const pairs = search.split('&')

  pairs.forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '')
    }
  })

  return params
}

/**
 * 构建 URL 参数
 * @param params 参数对象
 * @returns 参数字符串
 */
export function buildUrlParams(params: Record<string, any>): string {
  const pairs: string[] = []

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== null && value !== undefined) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  })

  return pairs.join('&')
}

/**
 * 添加 URL 参数
 * @param url URL
 * @param params 参数对象
 * @returns 新 URL
 */
export function addUrlParams(url: string, params: Record<string, any>): string {
  const paramStr = buildUrlParams(params)
  if (!paramStr) return url

  const separator = url.includes('?') ? '&' : '?'
  return url + separator + paramStr
}

/**
 * 移除 URL 参数
 * @param url URL
 * @param keys 要移除的参数键
 * @returns 新 URL
 */
export function removeUrlParams(url: string, keys: string[]): string {
  const [baseUrl, search] = url.split('?')
  if (!search) return url

  const params = parseUrlParams(url)
  keys.forEach((key) => {
    delete params[key]
  })

  const paramStr = buildUrlParams(params)
  return paramStr ? `${baseUrl}?${paramStr}` : baseUrl || ''
}

/**
 * 获取 URL 参数值
 * @param key 参数键
 * @param url URL（可选，默认当前页面 URL）
 * @returns 参数值
 */
export function getUrlParam(key: string, url?: string): string | null {
  const params = parseUrlParams(url)
  return params[key] || null
}

/**
 * 获取域名
 * @param url URL
 * @returns 域名
 */
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return ''
  }
}

/**
 * 判断是否为外部链接
 * @param url URL
 * @returns 是否为外部链接
 */
export function isExternalLink(url: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(url)
}

/**
 * 打开新窗口
 * @param url URL
 * @param target 目标（默认 _blank）
 */
export function openWindow(url: string, target: string = '_blank'): void {
  window.open(url, target)
}

/**
 * 下载文件
 * @param url 文件 URL
 * @param filename 文件名（可选）
 */
export function downloadByUrl(url: string, filename?: string): void {
  const link = document.createElement('a')
  link.href = url
  if (filename) {
    link.download = filename
  }
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
