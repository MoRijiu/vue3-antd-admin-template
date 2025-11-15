/**
 * 验证工具
 */

/**
 * 验证邮箱
 * @param email 邮箱
 * @returns 是否有效
 */
export function isEmail(email: string): boolean {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return reg.test(email)
}

/**
 * 验证手机号（中国大陆）
 * @param phone 手机号
 * @returns 是否有效
 */
export function isPhone(phone: string): boolean {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/**
 * 验证身份证号（中国大陆）
 * @param idCard 身份证号
 * @returns 是否有效
 */
export function isIdCard(idCard: string): boolean {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idCard)
}

/**
 * 验证 URL
 * @param url URL
 * @returns 是否有效
 */
export function isUrl(url: string): boolean {
  const reg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?[;&a-z\d%_.~+=-]*)?$/
  return reg.test(url)
}

/**
 * 验证 IP 地址
 * @param ip IP 地址
 * @returns 是否有效
 */
export function isIP(ip: string): boolean {
  const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  return reg.test(ip)
}

/**
 * 验证端口号
 * @param port 端口号
 * @returns 是否有效
 */
export function isPort(port: string | number): boolean {
  const portNum = typeof port === 'string' ? parseInt(port) : port
  return portNum >= 0 && portNum <= 65535
}

/**
 * 验证数字
 * @param value 值
 * @returns 是否为数字
 */
export function isNumber(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * 验证整数
 * @param value 值
 * @returns 是否为整数
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(Number(value))
}

/**
 * 验证正整数
 * @param value 值
 * @returns 是否为正整数
 */
export function isPositiveInteger(value: any): boolean {
  return isInteger(value) && Number(value) > 0
}

/**
 * 验证密码强度
 * @param password 密码
 * @returns 强度等级 0-4
 */
export function getPasswordStrength(password: string): number {
  let strength = 0

  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++

  return Math.min(strength, 4)
}

/**
 * 验证密码（至少 8 位，包含大小写字母和数字）
 * @param password 密码
 * @returns 是否有效
 */
export function isStrongPassword(password: string): boolean {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return reg.test(password)
}

/**
 * 验证用户名（4-16 位字母、数字、下划线）
 * @param username 用户名
 * @returns 是否有效
 */
export function isUsername(username: string): boolean {
  const reg = /^[a-zA-Z0-9_]{4,16}$/
  return reg.test(username)
}

/**
 * 验证中文
 * @param value 值
 * @returns 是否为中文
 */
export function isChinese(value: string): boolean {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(value)
}

/**
 * 验证银行卡号
 * @param cardNo 银行卡号
 * @returns 是否有效
 */
export function isBankCard(cardNo: string): boolean {
  const reg = /^[1-9]\d{9,29}$/
  return reg.test(cardNo)
}

/**
 * 验证车牌号
 * @param plateNo 车牌号
 * @returns 是否有效
 */
export function isPlateNo(plateNo: string): boolean {
  const reg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{4,5}[A-Z0-9挂学警港澳]$/
  return reg.test(plateNo)
}
