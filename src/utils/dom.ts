/**
 * DOM 工具
 */

/**
 * 判断元素是否在视口内
 * @param el 元素
 * @returns 是否在视口内
 */
export function isInViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 滚动到元素
 * @param el 元素或选择器
 * @param options 配置
 */
export function scrollToElement(
  el: Element | string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void {
  const element = typeof el === 'string' ? document.querySelector(el) : el
  if (element) {
    element.scrollIntoView(options)
  }
}

/**
 * 滚动到顶部
 * @param smooth 是否平滑滚动（默认 true）
 */
export function scrollToTop(smooth: boolean = true): void {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  })
}

/**
 * 滚动到底部
 * @param smooth 是否平滑滚动（默认 true）
 */
export function scrollToBottom(smooth: boolean = true): void {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  })
}

/**
 * 获取滚动位置
 * @returns 滚动位置
 */
export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop,
  }
}

/**
 * 添加类名
 * @param el 元素
 * @param className 类名
 */
export function addClass(el: Element, className: string): void {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}

/**
 * 移除类名
 * @param el 元素
 * @param className 类名
 */
export function removeClass(el: Element, className: string): void {
  if (el.classList.contains(className)) {
    el.classList.remove(className)
  }
}

/**
 * 切换类名
 * @param el 元素
 * @param className 类名
 */
export function toggleClass(el: Element, className: string): void {
  el.classList.toggle(className)
}

/**
 * 判断是否有类名
 * @param el 元素
 * @param className 类名
 * @returns 是否有类名
 */
export function hasClass(el: Element, className: string): boolean {
  return el.classList.contains(className)
}

/**
 * 获取元素样式
 * @param el 元素
 * @param styleName 样式名
 * @returns 样式值
 */
export function getStyle(el: Element, styleName: string): string {
  return window.getComputedStyle(el).getPropertyValue(styleName)
}

/**
 * 设置元素样式
 * @param el 元素
 * @param styles 样式对象
 */
export function setStyle(el: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(el.style, styles)
}

/**
 * 全屏
 * @param el 元素（可选，默认整个页面）
 */
export function requestFullscreen(el?: Element): void {
  const element = el || document.documentElement
  if (element.requestFullscreen) {
    element.requestFullscreen()
  }
}

/**
 * 退出全屏
 */
export function exitFullscreen(): void {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

/**
 * 判断是否全屏
 * @returns 是否全屏
 */
export function isFullscreen(): boolean {
  return !!document.fullscreenElement
}

/**
 * 切换全屏
 * @param el 元素（可选，默认整个页面）
 */
export function toggleFullscreen(el?: Element): void {
  if (isFullscreen()) {
    exitFullscreen()
  } else {
    requestFullscreen(el)
  }
}

/**
 * 获取元素位置
 * @param el 元素
 * @returns 位置信息
 */
export function getElementPosition(el: Element): {
  top: number
  left: number
  width: number
  height: number
} {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    width: rect.width,
    height: rect.height,
  }
}
