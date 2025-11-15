import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetUno from '@unocss/preset-uno'

export default defineConfig({
  // 预设
  presets: [
    // 默认预设（Tailwind CSS / Windi CSS 兼容）
    presetUno(),

    // 属性化模式支持
    presetAttributify(),

    // 图标预设
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),

    // 排版预设
    presetTypography(),

    // Web 字体预设
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],

  // 转换器
  transformers: [
    // 支持 @apply、@screen 等指令
    transformerDirectives(),

    // 支持变体组功能，如 hover:(bg-gray-400 font-medium)
    transformerVariantGroup(),
  ],

  // 自定义规则
  rules: [
    // 示例：自定义规则
    // ['custom-rule', { color: 'red' }],
  ],

  // 快捷方式
  shortcuts: [
    // 示例：常用组合
    [
      'btn',
      'px-4 py-2 rounded inline-block bg-blue-500 text-white cursor-pointer hover:bg-blue-600 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    ['btn-primary', 'bg-blue-500 hover:bg-blue-600 text-white'],
    ['btn-secondary', 'bg-gray-500 hover:bg-gray-600 text-white'],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-blue-600',
    ],

    // 布局相关
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-col-center', 'flex flex-col items-center justify-center'],

    // 文本相关
    ['text-ellipsis', 'overflow-hidden text-ellipsis whitespace-nowrap'],
    ['text-ellipsis-2', 'overflow-hidden text-ellipsis line-clamp-2'],
    ['text-ellipsis-3', 'overflow-hidden text-ellipsis line-clamp-3'],
  ],

  // 主题配置
  theme: {
    colors: {
      // 自定义颜色
      primary: {
        DEFAULT: '#1890ff',
        50: '#e6f7ff',
        100: '#bae7ff',
        200: '#91d5ff',
        300: '#69c0ff',
        400: '#40a9ff',
        500: '#1890ff',
        600: '#096dd9',
        700: '#0050b3',
        800: '#003a8c',
        900: '#002766',
      },
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
      info: '#1890ff',
    },
    breakpoints: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
  },

  // 安全列表
  safelist: [
    // 确保这些类始终生成
    'prose',
    'prose-sm',
    'm-auto',
    'text-left',
  ],
})
