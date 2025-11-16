/**
 * 文件下载工具
 */

import type { AxiosResponse } from 'axios'

/**
 * 下载文件
 * @param response Axios 响应对象
 * @param filename 文件名（可选，如果不传则从响应头中获取）
 */
export function downloadFile(response: AxiosResponse, filename?: string): void {
  // 获取文件名
  let downloadFilename = filename

  if (!downloadFilename) {
    // 从响应头中获取文件名
    const contentDisposition = response.headers['content-disposition']
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (filenameMatch && filenameMatch[1]) {
        downloadFilename = filenameMatch[1].replace(/['"]/g, '')
        // 解码文件名
        if (downloadFilename) {
          downloadFilename = decodeURIComponent(downloadFilename)
        }
      }
    }
  }

  // 如果还是没有文件名，使用默认值
  if (!downloadFilename) {
    downloadFilename = `download_${Date.now()}`
  }

  // 创建 Blob 对象
  const blob = new Blob([response.data], {
    type: response.headers['content-type'] || 'application/octet-stream',
  })

  // 创建下载链接
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = downloadFilename
  link.style.display = 'none'

  // 触发下载
  document.body.appendChild(link)
  link.click()

  // 清理
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 下载 Base64 文件
 * @param base64 Base64 字符串
 * @param filename 文件名
 * @param mimeType MIME 类型
 */
export function downloadBase64File(base64: string, filename: string, mimeType?: string): void {
  // 移除 Base64 前缀
  const base64Data = base64.replace(/^data:[^;]+;base64,/, '')

  // 转换为 Blob
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType || 'application/octet-stream' })

  // 创建下载链接
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  // 触发下载
  document.body.appendChild(link)
  link.click()

  // 清理
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 下载 URL 文件
 * @param url 文件 URL
 * @param filename 文件名
 */
export function downloadUrlFile(url: string, filename?: string): void {
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

/**
 * 导出 JSON 数据为文件
 * @param data JSON 数据
 * @param filename 文件名
 */
export function exportJson(data: any, filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.json') ? filename : `${filename}.json`
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * 导出 CSV 数据
 * @param data CSV 数据（二维数组）
 * @param filename 文件名
 */
export function exportCsv(data: string[][], filename: string): void {
  const csvContent = data.map((row) => row.join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
