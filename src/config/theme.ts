/**
 * 主题配置文件
 * 定义应用的主题色、明暗模式等样式配置
 */

/**
 * 主题模式类型
 */
export type ThemeMode = 'light' | 'dark'

/**
 * 主题色配置
 */
export interface ThemeColor {
  name: string // 主题色名称
  value: string // 主题色值
  label: string // 显示标签（用于国际化 key）
}

/**
 * 预设主题色列表
 */
export const THEME_COLORS: ThemeColor[] = [
  {
    name: 'blue',
    value: '#1890ff',
    label: 'theme.colors.blue',
  },
  {
    name: 'purple',
    value: '#722ed1',
    label: 'theme.colors.purple',
  },
  {
    name: 'cyan',
    value: '#13c2c2',
    label: 'theme.colors.cyan',
  },
  {
    name: 'green',
    value: '#52c41a',
    label: 'theme.colors.green',
  },
  {
    name: 'magenta',
    value: '#eb2f96',
    label: 'theme.colors.magenta',
  },
  {
    name: 'red',
    value: '#f5222d',
    label: 'theme.colors.red',
  },
  {
    name: 'orange',
    value: '#fa8c16',
    label: 'theme.colors.orange',
  },
]

/**
 * 默认主题色
 */
export const DEFAULT_THEME_COLOR = THEME_COLORS[0].value

/**
 * 默认主题模式
 */
export const DEFAULT_THEME_MODE: ThemeMode = 'light'

/**
 * 浅色主题配置
 */
export const LIGHT_THEME = {
  // 文字颜色
  textColor: 'rgba(0, 0, 0, 0.85)',
  textColorSecondary: 'rgba(0, 0, 0, 0.65)',
  textColorTertiary: 'rgba(0, 0, 0, 0.45)',
  textColorDisabled: 'rgba(0, 0, 0, 0.25)',

  // 背景颜色
  backgroundColor: '#f0f2f5',
  backgroundColorLight: '#fafafa',
  backgroundColorWhite: '#ffffff',

  // 边框颜色
  borderColor: '#d9d9d9',
  borderColorLight: '#e8e8e8',
  borderColorDark: '#bfbfbf',

  // 阴影
  boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
}

/**
 * 深色主题配置
 */
export const DARK_THEME = {
  // 文字颜色
  textColor: 'rgba(255, 255, 255, 0.85)',
  textColorSecondary: 'rgba(255, 255, 255, 0.65)',
  textColorTertiary: 'rgba(255, 255, 255, 0.45)',
  textColorDisabled: 'rgba(255, 255, 255, 0.25)',

  // 背景颜色
  backgroundColor: '#141414',
  backgroundColorLight: '#1f1f1f',
  backgroundColorWhite: '#2a2a2a',

  // 边框颜色
  borderColor: '#434343',
  borderColorLight: '#303030',
  borderColorDark: '#595959',

  // 阴影
  boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 6px 16px 0 rgba(0, 0, 0, 0.32)',
}

/**
 * CSS 变量名称映射
 */
export const CSS_VARIABLES = {
  // 主题色
  primaryColor: '--primary-color',

  // 文字颜色
  textColor: '--text-color',
  textColorSecondary: '--text-color-secondary',
  textColorTertiary: '--text-color-tertiary',
  textColorDisabled: '--text-color-disabled',

  // 背景颜色
  backgroundColor: '--background-color',
  backgroundColorLight: '--background-color-light',
  backgroundColorWhite: '--background-color-white',

  // 边框颜色
  borderColor: '--border-color',
  borderColorLight: '--border-color-light',
  borderColorDark: '--border-color-dark',

  // 阴影
  boxShadow: '--box-shadow',
}
