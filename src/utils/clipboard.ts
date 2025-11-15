/**
 * 剪贴板工具
 */

/**
 * 复制文本到剪贴板
 * @param text 文本
 * @returns Promise<boolean>
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 优先使用现代 API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-999999px'
    textarea.style.top = '-999999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    const result = document.execCommand('copy')
    document.body.removeChild(textarea)

    return result
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

/**
 * 从剪贴板读取文本
 * @returns Promise<string>
 */
export async function readFromClipboard(): Promise<string> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return await navigator.clipboard.readText()
    }
    return ''
  } catch (error) {
    console.error('读取剪贴板失败:', error)
    return ''
  }
}

/**
 * 复制图片到剪贴板
 * @param blob 图片 Blob
 * @returns Promise<boolean>
 */
export async function copyImageToClipboard(blob: Blob): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
      return true
    }
    return false
  } catch (error) {
    console.error('复制图片失败:', error)
    return false
  }
}
