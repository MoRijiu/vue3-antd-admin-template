/**
 * Store 类型定义
 */

/**
 * 用户信息
 */
export interface UserInfo {
  id: number
  name: string
  email: string
  avatar?: string
  phone?: string
  status?: number
  createTime?: string
}

/**
 * 应用配置
 */
export interface AppConfig {
  collapsed: boolean
  device: 'desktop' | 'mobile'
  theme: 'light' | 'dark'
  locale: string
  loading: boolean
}

/**
 * 权限配置
 */
export interface PermissionConfig {
  roles: string[]
  permissions: string[]
}
