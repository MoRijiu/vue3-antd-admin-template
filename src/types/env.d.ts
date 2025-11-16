/// <reference types="vite/client" />

/**
 * Vue 组件类型声明
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * 图片资源类型声明
 */
declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

/**
 * UnoCSS 类型声明
 */
declare module 'virtual:uno.css' {
  const content: string
  export default content
}

declare module '@unocss/reset/tailwind.css' {
  const content: string
  export default content
}

/**
 * 环境变量类型声明
 */
interface ImportMetaEnv {
  // 环境标识
  readonly VITE_ENV: 'local' | 'development' | 'test' | 'production'

  // 应用配置
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string

  // 服务器配置
  readonly VITE_PORT: number
  readonly VITE_OPEN: boolean
  readonly VITE_HTTPS: boolean

  // API 配置
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_PROXY_TARGET: string

  // 功能开关
  readonly VITE_USE_MOCK: boolean
  readonly VITE_USE_PERMISSION: boolean
  readonly VITE_USE_CACHE: boolean

  // 构建配置
  readonly VITE_BUILD_COMPRESS: boolean
  readonly VITE_DROP_CONSOLE: boolean
  readonly VITE_SOURCEMAP: boolean

  // 业务配置
  readonly VITE_UPLOAD_SIZE: number
  readonly VITE_TOKEN_KEY: string
  readonly VITE_TOKEN_EXPIRE: number

  // CDN 配置
  readonly VITE_CDN_URL?: string
}

/**
 * ImportMeta 类型扩展
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
